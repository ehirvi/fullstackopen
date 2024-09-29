import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewEntry } from "../../types";

interface Props {
  closeForm: () => void;
  addNewEntry: (entryDetails: NewEntry) => Promise<void>;
}

const HealthCheckEntryForm = ({ closeForm, addNewEntry }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addNewEntry({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(", "),
    });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        border: "2px dashed",
        borderRadius: 5,
        padding: 8,
      }}
      onSubmit={onSubmit}
    >
      <h3>New HealthCheck Entry</h3>
      <TextField
        variant="filled"
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        variant="filled"
        label="Date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        variant="filled"
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        variant="filled"
        label="Healthcheck rating"
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
      <TextField
        variant="filled"
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Button variant="contained" color="error" onClick={closeForm}>
          Cancel
        </Button>
        <Button
          style={{ justifySelf: "end" }}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default HealthCheckEntryForm;
