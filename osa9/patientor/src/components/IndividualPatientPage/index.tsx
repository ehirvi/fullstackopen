import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, NewEntry, Patient } from "../../types";
import patients from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "../EntryDetails";
import { Alert, Button } from "@mui/material";
import NewEntryForm from "../NewEntryForm";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[];
}

const IndividualPatientPage = ({ diagnoses }: Props) => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await patients.getOne(patientId);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [patientId]);

  const handleForm = () => {
    const state = !formOpen;
    setError(undefined);
    setFormOpen(state);
  };

  const addNewEntry = async (entryDetails: NewEntry) => {
    if (patientId && patient) {
      try {
        const addedEntry = await patients.addNewEntry(patientId, entryDetails);
        const updatedPatient = patient;
        updatedPatient.entries = updatedPatient.entries.concat(addedEntry);
        setPatient(updatedPatient);
        handleForm();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data) {
            setError(error.response.data.error[0].message);
          }
        }
      }
    }
  };

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
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{ marginTop: 10 }}>
        {!formOpen && (
          <Button variant="contained" onClick={handleForm}>
            Add New Entry
          </Button>
        )}
        {formOpen && (
          <NewEntryForm
            closeForm={handleForm}
            addNewEntry={addNewEntry}
            diagnoses={diagnoses}
          />
        )}
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
