import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [shownGenre, setShownGenre] = useState("");
  const bookQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: shownGenre,
    },
  });
  const genreQuery = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  if (bookQuery.loading || genreQuery.loading) {
    return <div>...loading</div>;
  }

  const books = [...bookQuery.data.allBooks];
  const genres = [...genreQuery.data.allGenres];

  return (
    <div>
      <h1>books</h1>
      <p>
        showing genre: <b>{shownGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g.name} onClick={() => setShownGenre(g.name)}>
            {g.name}
          </button>
        ))}
        <button onClick={() => setShownGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
