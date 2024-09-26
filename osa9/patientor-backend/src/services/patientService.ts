import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types/types";
import data from "../data/patients";
import { v1 as uuid } from "uuid";
import { parseDiagnosisCodes } from "../utils";

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getFullPatientData = (id: string): Patient | undefined => {
  return data.find((p) => p.id === id);
};

const addNewPatient = (patientEntry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patientEntry,
    entries: [],
  };
  data.push(newPatient);
  return newPatient;
};

const addNewDiaryEntry = (
  patientId: string,
  diaryEntry: NewEntry
): Entry | null => {
  const patient = getFullPatientData(patientId);
  if (!patient) {
    return null;
  }
  const newEntry: Entry = {
    id: uuid(),
    ...diaryEntry,
    diagnosisCodes: parseDiagnosisCodes(diaryEntry),
  };
  patient.entries = patient.entries.concat(newEntry);
  const index = data.findIndex((p) => p.id === patient.id);
  data[index] = patient;
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  getFullPatientData,
  addNewPatient,
  addNewDiaryEntry,
};
