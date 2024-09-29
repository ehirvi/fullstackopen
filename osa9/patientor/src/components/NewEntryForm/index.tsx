import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewEntry } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import { assertNever } from "../../utils";

interface Props {
  closeForm: () => void;
  addNewEntry: (entryDetails: NewEntry) => Promise<void>;
}

const NewEntryForm = ({ closeForm, addNewEntry }: Props) => {
  const [type, setType] = useState<NewEntry["type"]>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(", "),
    };
    let newEntry: NewEntry;
    switch (type) {
      case "HealthCheck":
        newEntry = {
          type: type,
          ...baseEntry,
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          type: type,
          ...baseEntry,
          employerName,
        };
        if (sickLeaveStartDate !== "" && sickLeaveEndDate != "") {
          newEntry = {
            ...newEntry,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            },
          };
        }
        break;
      case "Hospital":
        newEntry = {
          type: type,
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      default:
        assertNever(type);
        return;
    }
    addNewEntry(newEntry);
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
      <FormControl style={{ marginTop: 10 }}>
        <InputLabel>Select Type</InputLabel>
        <Select
          value={type}
          label="Entry Type"
          onChange={({ target }) => setType(target.value as NewEntry["type"])}
        >
          <MenuItem value="HealthCheck">Healtcheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
      <h3>New {type} Entry</h3>
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
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      {type === "HealthCheck" ? (
        <HealthCheckForm
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
        />
      ) : type === "OccupationalHealthcare" ? (
        <OccupationalHealthcareForm
          employerName={employerName}
          sickLeaveStartDate={sickLeaveStartDate}
          sickLeaveEndDate={sickLeaveEndDate}
          setEmployerName={setEmployerName}
          setSickLeaveStartDate={setSickLeaveStartDate}
          setSickLeaveEndDate={setSickLeaveEndDate}
        />
      ) : (
        <HospitalForm
          dischargeDate={dischargeDate}
          dischargeCriteria={dischargeCriteria}
          setDischargeDate={setDischargeDate}
          setDiscrhageCriteria={setDischargeCriteria}
        />
      )}
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

export default NewEntryForm;
