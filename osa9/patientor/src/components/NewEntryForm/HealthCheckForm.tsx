import { TextField } from "@mui/material";

interface Props {
  healthCheckRating: string;
  setHealthCheckRating: (value: React.SetStateAction<string>) => void;
}

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  return (
    <TextField
      variant="filled"
      label="Healthcheck rating"
      value={healthCheckRating}
      onChange={({ target }) => setHealthCheckRating(target.value)}
    />
  );
};

export default HealthCheckForm;
