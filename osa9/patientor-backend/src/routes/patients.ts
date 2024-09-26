import express, { Request, Response } from "express";
import {
  errorMiddleware,
  newDiaryEntryParser,
  newPatientParser,
} from "../middleware";
import {
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types/types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<Patient>) => {
  const patientData = patientService.getFullPatientData(req.params.id);
  if (patientData) {
    res.status(200).json(patientData);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addNewPatient(req.body);
    res.status(201).json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newDiaryEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
    const patientId = req.params.id;
    const addedEntry = patientService.addNewDiaryEntry(patientId, req.body);
    if (!addedEntry) {
      res.status(400).json({ error: "Error adding new entry" });
    } else {
      res.status(201).json(addedEntry);
    }
  }
);

router.use(errorMiddleware);

export default router;
