import { useEffect, useState } from "react";
import DiaryList from "./components/DiaryList";
import { DiaryEntry, NewDiaryEntry } from "./types";
import NewDiaryForm from "./components/NewDiaryForm";
import diaryService from "./components/services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const fetchDiaries = async () => {
    const data = await diaryService.getAll();
    setDiaries(data);
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  const handleNewEntry = async (newEntry: NewDiaryEntry) => {
    const data = await diaryService.createDiary(newEntry);
    setDiaries(diaries.concat(data));
  };

  return (
    <>
      <NewDiaryForm handleNewEntry={handleNewEntry} />
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
