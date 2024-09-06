import express, { Request } from "express";
import { Response } from "express";
import { errorMiddleware, newPatientParser } from "../middleware";
import { NewPatient, NonSensitivePatientData, Patient } from "../types/types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(patientService.getNonSensitiveEntries());
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
