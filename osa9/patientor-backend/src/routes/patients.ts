import express from "express";
import { Response } from "express";
import { NonSensitivePatientData } from "../types/types";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "An error has occured:";
    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
