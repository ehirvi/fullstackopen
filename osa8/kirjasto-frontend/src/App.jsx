import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommended from "./components/Recommended";
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      alert(`New book ${addedBook.title} added`);
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: "" } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );
      const author = addedBook.author;
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        if (!allAuthors.find((a) => a.name === author.name)) {
          return {
            allAuthors: allAuthors.concat(author),
          };
        }
      });
      addedBook.genres.map((g) => {
        client.cache.updateQuery(
          { query: ALL_GENRES, variables: { name: g.name } },
          ({ allGenres }) => {
            if (!allGenres.find((genre) => genre.name === g.name)) {
              return {
                allGenres: allGenres.concat(g),
              };
            }
          }
        ),
          client.cache.updateQuery(
            { query: ALL_BOOKS, variables: { genre: g.name } },
            (data) => {
              if (data) {
                return {
                  allBooks: data.allBooks.concat(addedBook),
                };
              }
            }
          );
      });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    setToken("");
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
