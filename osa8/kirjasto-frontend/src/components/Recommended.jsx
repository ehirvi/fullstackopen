import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";
import { useEffect, useState } from "react";

const Recommended = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const userQuery = useQuery(CURRENT_USER);
  const bookQuery = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  useEffect(() => {
    if (userQuery.data) {
      setFavoriteGenre(userQuery.data.me.favoriteGenre.name);
    }
  }, [userQuery.data]);

  if (!show) {
    return null;
  }

  if (!userQuery.data || !bookQuery.data) {
    return <div>...loading</div>;
  }

  const user = { ...userQuery.data.me };
  const books = [...bookQuery.data.allBooks];

  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre <b>{user.favoriteGenre.name}</b>
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
    </div>
  );
};

export default Recommended;
