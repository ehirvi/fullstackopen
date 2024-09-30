import {
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

interface Props {
  dischargeDate: string;
  dischargeCriteria: string;
  setDischargeDate: (value: React.SetStateAction<string>) => void;
  setDiscrhageCriteria: (value: React.SetStateAction<string>) => void;
}

const HospitalForm = ({
  dischargeDate,
  dischargeCriteria,
  setDischargeDate,
  setDiscrhageCriteria,
}: Props) => {
  return (
    <>
      <InputLabel>Discharge</InputLabel>
      <FormGroup style={{ marginLeft: 10 }}>
        <FormHelperText>Date</FormHelperText>
        <Input
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
      </FormGroup>
      <TextField
        style={{ marginLeft: 10 }}
        variant="filled"
        label="Criteria"
        value={dischargeCriteria}
        onChange={({ target }) => setDiscrhageCriteria(target.value)}
      />
    </>
  );
};

export default HospitalForm;
