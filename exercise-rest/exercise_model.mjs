import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users_db", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to Database....");
});

mongoose.set("useCreateIndex", true);

const exerciseSchema = mongoose.Schema({
  name: { type: "String", required: true },
  reps: { type: "Number", required: true },
  weight: { type: "Number", required: true },
  unit: { type: "String", required: true },
  date: { type: "String", required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  exercise.save();
  console.log(exercise);
  return exercise;
};

const findExercise = async (filter, projection, limit) => {
  const query = Exercise.find(filter).select(projection).limit(limit);

  return query.exec();
};

const updateExercise = async (filter, set) => {
  const result = await Exercise.updateMany(filter, set);

  return result;
};

const deleteExercise = async (filter) => {
  const result = await Exercise.deleteMany(filter);

  return result.deletedCount;
};

export { findExercise, createExercise, updateExercise, deleteExercise };
