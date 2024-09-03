import express from "express";
import { Response } from "express";
import { NonSensitivePatientData } from "../types/types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

export default router;
