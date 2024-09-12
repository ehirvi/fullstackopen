import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const API_URL = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const res = await axios.get<DiaryEntry[]>(API_URL);
  return res.data;
};

const createDiary = async (newEntry: NewDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(API_URL, newEntry);
  return res.data;
};

export default { getAll, createDiary };
