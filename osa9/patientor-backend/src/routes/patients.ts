/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { Response } from "express";
import { NonSensitivePatientData } from "../types/types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addNewPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(newPatient);
});

export default router;
