import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosesCodes = ({ entry, diagnoses }: Props) => {
  return (
    <ul>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>
          {c} {diagnoses.find((d) => d.code === c)?.name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosesCodes;
