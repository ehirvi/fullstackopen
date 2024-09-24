import { Diagnosis, Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import DiagnosesCodes from "./DiagnosesCodes";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  if (entry.type === "OccupationalHealthcare") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 5,
          padding: 5,
          border: "solid",
          borderRadius: 8,
          borderWidth: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {entry.date}
          <WorkIcon />
          <i>{entry.employerName}</i>
        </div>
        <i>{entry.description}</i>
        {entry.diagnosisCodes && (
          <DiagnosesCodes entry={entry} diagnoses={diagnoses} />
        )}
        {entry.sickLeave && (
          <>
            <div>Sick leave starts: {entry.sickLeave.startDate}</div>
            <div>Sick leave ends: {entry.sickLeave.endDate}</div>
          </>
        )}
        <div>diagnosed by {entry.specialist}</div>
      </div>
    );
  }
};

export default OccupationalHealthcareEntry;
