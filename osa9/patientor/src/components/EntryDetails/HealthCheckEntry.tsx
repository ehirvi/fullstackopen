import { Diagnosis, Entry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiagnosesCodes from "./DiagnosesCodes";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  const healthRatingColor = {
    0: "green",
    1: "yellow",
    2: "orange",
    3: "red",
  };

  if (entry.type === "HealthCheck") {
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
          <MedicalServicesIcon />
        </div>
        <i>{entry.description}</i>
        {entry.diagnosisCodes && (
          <DiagnosesCodes entry={entry} diagnoses={diagnoses} />
        )}
        <FavoriteIcon htmlColor={healthRatingColor[entry.healthCheckRating]} />
        <div>diagnosed by {entry.specialist}</div>
      </div>
    );
  }
};

export default HealthCheckEntry;
