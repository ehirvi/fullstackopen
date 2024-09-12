import { useEffect, useState } from "react";
import DiaryList from "./components/DiaryList";
import { DiaryEntry, NewDiaryEntry } from "./types";
import NewDiaryForm from "./components/NewDiaryForm";
import diaryService from "./services/diaryService";
import Error from "./components/Error";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDiaries = async () => {
    const data = await diaryService.getAll();
    setDiaries(data);
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  const handleNewEntry = async (newEntry: NewDiaryEntry) => {
    try {
      const data = await diaryService.createDiary(newEntry);
      setDiaries(diaries.concat(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <Error errorMessage={errorMessage} />
      <NewDiaryForm handleNewEntry={handleNewEntry} />
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
