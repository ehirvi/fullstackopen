import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [born, setBorn] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>...loading</div>;
  }

  const authors = [...result.data.allAuthors];

  const handleUpdate = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name: selectedAuthor, setBornTo: born } });
  };

  return (
    <div>
      <h1>authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={handleUpdate}>
            <select
              value={selectedAuthor}
              onChange={(event) => setSelectedAuthor(event.target.value)}
            >
              <option></option>
              {authors.map((a) => (
                <option key={a.name}>{a.name}</option>
              ))}
            </select>
            <div>
              Born:{" "}
              <input
                type="number"
                value={born}
                onChange={(event) => setBorn(Number(event.target.value))}
              />
            </div>
            <button type="submit">Update author</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default Authors;
