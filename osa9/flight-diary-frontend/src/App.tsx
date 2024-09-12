import { useEffect, useState } from "react";
import "./App.css";
import DiaryList from "./components/DiaryList";
import axios from "axios";
import { DiaryEntry } from "./types";

const API_URL = "http://localhost:3000/api/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const fetchDiaries = async () => {
    const res = await axios.get<DiaryEntry[]>(API_URL);
    setDiaries(res.data);
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <>
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
