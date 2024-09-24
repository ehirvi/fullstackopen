import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patients from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "../EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const IndividualPatientPage = ({ diagnoses }: Props) => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await patients.getOne(patientId);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [patientId]);

  if (!patient) {
    return (
      <div>
        <h2>Patient not found</h2>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>{patient.name}</h2>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : null}
      </div>
      <div>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </div>
      <div>
        <h3>entries</h3>
        {patient.entries.map((e) => (
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default IndividualPatientPage;
