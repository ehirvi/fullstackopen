import {
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

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
      <FormGroup style={{ marginLeft: 10 }}>
        <FormHelperText>Start</FormHelperText>
        <Input
          type="date"
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <FormHelperText>End</FormHelperText>
        <Input
          type="date"
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
      </FormGroup>
    </>
  );
};

export default OccupationalHealthcareForm;
