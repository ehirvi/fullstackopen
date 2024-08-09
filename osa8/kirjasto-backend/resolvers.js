const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const Genre = require("./models/genre");
const { GraphQLError, subscribe } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
        const genre = await Genre.findOne({ name: args.genre });
        books = books.find({ genres: { $in: genre } });
      }
      return books.populate("author").populate({ path: "genres" });
    },
    allAuthors: async () => {
      return Author.find({});
    },
    allGenres: async () => {
      return Genre.find({});
    },
    me: (root, args, context) => {
      return context.currentUser.populate("favoriteGenre");
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("User not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
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
      let genres = [];
      for (let genre of args.genres) {
        let genreFound = await Genre.findOne({ name: genre });
        if (!genreFound) {
          genreFound = await new Genre({ name: genre }).save();
        }
        genres = genres.concat(genreFound._id);
      }
      const book = new Book({
        ...args,
        genres,
        author: authorFound,
      });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Book name must be at least 5 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      const populatedBook = book.populate({path: "genres"})
      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("User not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
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
    createUser: async (root, args) => {
      let genreFound = await Genre.findOne({ name: args.favoriteGenre });
      if (!genreFound) {
        genreFound = await new Genre({ name: args.favoriteGenre }).save();
      }
      const user = new User({ ...args, favoriteGenre: genreFound });
      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new GraphQLError("Username must be at least 3 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "password") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      };
      return token;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },

  Author: {
    bookCount: async (root) => {
      const authorsBooks = await Book.find({ author: root.id });
      return authorsBooks.length;
    },
  },
};

module.exports = resolvers;
