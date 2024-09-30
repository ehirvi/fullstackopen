import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Props {
  healthCheckRating: number;
  setHealthCheckRating: (value: React.SetStateAction<number>) => void;
}

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  return (
    <FormControl>
      <FormLabel>Healthcheck Rating</FormLabel>
      <RadioGroup
        row
        value={healthCheckRating}
        onChange={(event) => setHealthCheckRating(Number(event.target.value))}
      >
        <FormControlLabel value={0} control={<Radio />} label="Healthy" />
        <FormControlLabel value={1} control={<Radio />} label="Low Risk" />
        <FormControlLabel value={2} control={<Radio />} label="High Risk" />
        <FormControlLabel value={3} control={<Radio />} label="Critical Risk" />
      </RadioGroup>
    </FormControl>
  );
};

export default HealthCheckForm;
