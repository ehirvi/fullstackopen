import { DiaryEntry } from "../types";
import Diary from "./Diary";

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h1>Diary entries</h1>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </>
  );
};

export default DiaryList;
