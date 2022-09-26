import bodyParser from "body-parser";
import express from "express";
import {
  findExercise,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./exercise_model.mjs";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/exercise", (req, res) => {
  console.log("POST");
  createExercise(
    req.body.name,
    req.body.reps,
    req.body.weight,
    req.body.unit,
    req.body.date
  )
    .then((exercise) => {
      res.status(201).send({ status: 201, exercise: exercise });
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send({ err: err });
    });
});

app.get("/exercise", (req, res) => {
  console.log("GET");
  const filter = req.query === undefined ? {} : req.query;

  findExercise(filter, "", 0)
    .then((exercise) => {
      res.send(exercise);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ err: "request failed" });
    });
});

app.put("/exercise/:id", (req, res) => {
  console.log("PUT");
  const filter = { _id: req.params.id };
  console.log(req);
  console.log(req.body);

  updateExercise(filter, req.body)
    .then((exercise) => {
      res.status(200).send(exercise);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ error: err });
    });
});

app.delete("/exercise/:id", (req, res) => {
  const filter = { _id: req.params.id };

  deleteExercise(filter)
    .then((numDeleted) => {
      console.log(
        `Deleted ${numDeleted} Exercise(s) with ID: ${req.query._id}`
      );
      res
        .status(204)
        .send(`Deleted ${numDeleted} Exercise(s) with ID: ${req.query._id}`);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
