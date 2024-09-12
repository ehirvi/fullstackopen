import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface NewDiaryFormProps {
  handleNewEntry: (newEntry: NewDiaryEntry) => void;
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const createNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    
    props.handleNewEntry(newEntry as NewDiaryEntry);
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new diary</h2>
      <form onSubmit={createNewEntry}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 10}}>
          visibility
          {Object.values(Visibility).map((v) => (
            <div key={v} style={{ display: "flex" }}>
              {v}
              <input
                type="radio"
                name="visibility"
                value={v}
                onChange={(event) => setVisibility(event.target.value)}
              />
            </div>
          ))}
        </div>
        <div style={{display: "flex", gap: 10}}>
          weather
          {Object.values(Weather).map((w) => (
            <div key={w} style={{display: "flex"}}>
              {w}
              <input
                type="radio"
                name="weather"
                value={w}
                onChange={(event) => setWeather(event.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
