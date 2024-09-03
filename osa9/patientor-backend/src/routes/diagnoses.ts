import express from "express";
import { Response } from "express";
import { Diagnosis } from "../types/types";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosisService.getAllEntries());
});

export default router;
