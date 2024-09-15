import express, { Request, Response } from "express";
import { errorMiddleware, newPatientParser } from "../middleware";
import { NewPatient, NonSensitivePatientData, Patient } from "../types/types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<Patient>) => {
  const patientData = patientService.getFullPatientData(req.params.id);
  if (patientData) {
    res.json(patientData);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addNewPatient(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
