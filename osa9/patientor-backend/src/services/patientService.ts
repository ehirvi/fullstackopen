import { NewPatient, NonSensitivePatientData, Patient } from "../types/types";
import data from "../data/patients";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patientData: NewPatient): NonSensitivePatientData => {
  const newPatient: Patient = {
    id: uuid(),
    ...patientData,
  };
  data.push(newPatient);
  return newPatient;
};

export default { getNonSensitiveEntries, addNewPatient };
