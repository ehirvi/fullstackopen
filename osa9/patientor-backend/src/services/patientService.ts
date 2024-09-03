import { NonSensitivePatientData } from "../types/types";
import data from "../data/patients";

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensitiveEntries };
