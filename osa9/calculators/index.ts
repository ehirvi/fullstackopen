import express from "express";
import bmiCalculator from "./bmiCalculator";
import { isNotNumber } from "./utils";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
