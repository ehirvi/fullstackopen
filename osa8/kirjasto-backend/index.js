const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const author = require("./models/author");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // let filteredBooks = [...books];
      // if (args.author) {
      //   filteredBooks = filteredBooks.filter((b) => b.author === args.author);
      // }
      // if (args.genre) {
      //   filteredBooks = filteredBooks.filter((b) =>
      //     b.genres.includes(args.genre)
      //   );
      // }
      // return filteredBooks;
      return Book.find({});
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      try {
        let authorFound = await Author.findOne({ name: args.author });
        if (!authorFound) {
          const newAuthor = new Author({
            name: args.author,
          });
          authorFound = await newAuthor.save();
        }
        const book = {
          ...args,
          author: authorFound
        }
        const savedBook = await new Book({...book}).save()
        return savedBook;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    // editAuthor: (root, args) => {
    //   const authorToEdit = authors.find((a) => a.name === args.name);
    //   if (!authorToEdit) {
    //     return null;
    //   }
    //   const editedAuthor = { ...authorToEdit, born: args.setBornTo };
    //   authors = authors.map((a) =>
    //     a.id === editedAuthor.id ? editedAuthor : a
    //   );
    //   return editedAuthor;
    // },
  },

  // Author: {
  //   bookCount: (root) => {
  //     return books.filter((b) => b.author === root.name).length;
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
