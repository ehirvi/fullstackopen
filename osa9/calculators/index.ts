import express from "express";
import bmiCalculator from "./bmiCalculator";
import { isNotNumber } from "./utils";
import exerciseCalculator from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.set("query parser", "extended");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = bmiCalculator.calculateBmi(height, weight);
  const result = {
    weight,
    height,
    bmi,
  };
  return res.json(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const data: any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!data.daily_exercises || !data.target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNotNumber(data.target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (const day of data.daily_exercises) {
    if (isNotNumber(day)) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = data.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target: number = data.target;

  const result = exerciseCalculator.calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
