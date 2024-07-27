const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const author = require("./models/author");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

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
      let books = Book.find({});
      if (args.author) {
        const authorFound = await Author.findOne({ name: args.author });
        books = books.find({ author: authorFound });
      }
      if (args.genre) {
        books = books.find({ genres: { $in: args.genre } });
      }
      return books.populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let authorFound = await Author.findOne({ name: args.author });
      if (!authorFound) {
        const newAuthor = new Author({
          name: args.author,
        });
        try {
          authorFound = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError(
            "Author name must be at least 4 characters long",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            }
          );
        }
      }
      const book = {
        ...args,
        author: authorFound,
      };
      try {
        const savedBook = await new Book({ ...book }).save();
        return savedBook;
      } catch (error) {
        throw new GraphQLError("Book name must be at least 5 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name });
      if (!authorToEdit) {
        return null;
      }
      try {
        authorToEdit.born = args.setBornTo;
        const editedAuthor = await authorToEdit.save();
        return editedAuthor;
      } catch (error) {
        return null;
      }
    },
  },

  Author: {
    bookCount: async (root) => {
      const authorsBooks = await Book.find({ author: root.id });
      return authorsBooks.length;
    },
  },
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
