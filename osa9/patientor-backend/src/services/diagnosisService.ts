import data from "../data/diagnoses";
import { Diagnosis } from "../types/types";

const getAllEntries = (): Diagnosis[] => {
  return data;
};

export default { getAllEntries };
