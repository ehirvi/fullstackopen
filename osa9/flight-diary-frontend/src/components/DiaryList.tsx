import { DiaryEntry } from "../types";
import Diary from "./Diary";

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </>
  );
};

export default DiaryList;
