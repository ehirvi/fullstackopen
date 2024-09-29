import { InputLabel, TextField } from "@mui/material";

interface Props {
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  setEmployerName: (value: React.SetStateAction<string>) => void;
  setSickLeaveStartDate: (value: React.SetStateAction<string>) => void;
  setSickLeaveEndDate: (value: React.SetStateAction<string>) => void;
}

const OccupationalHealthcareForm = ({
  employerName,
  sickLeaveStartDate,
  sickLeaveEndDate,
  setEmployerName,
  setSickLeaveStartDate,
  setSickLeaveEndDate,
}: Props) => {
  return (
    <>
      <TextField
        variant="filled"
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel>Sickleave</InputLabel>
      <TextField
        style={{ marginLeft: 10 }}
        variant="filled"
        label="Start"
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
      />
      <TextField
        style={{ marginLeft: 10 }}
        variant="filled"
        label="End"
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
