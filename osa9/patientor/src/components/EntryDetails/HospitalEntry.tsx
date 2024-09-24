import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DiagnosesCodes from "./DiagnosesCodes";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  if (entry.type === "Hospital")
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
          <LocalHospitalIcon />
        </div>
        <i>{entry.description}</i>
        {entry.diagnosisCodes && (
          <DiagnosesCodes entry={entry} diagnoses={diagnoses} />
        )}
        <div>Discharge date: {entry.discharge.date}</div>
        <div>Discharge criteria: {entry.discharge.criteria}</div>
        <div>diagnosed by {entry.specialist}</div>
      </div>
    );
};

export default HospitalEntry;
