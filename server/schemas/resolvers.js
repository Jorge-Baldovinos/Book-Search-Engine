const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user.id }).populate('books')
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, input, context) => {
            if (context.user) {
                return book.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: {
                            savedBooks: { bookId, author, description, title, image, link: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await book.findOneAndDelete({
                    _id: bookId,
                });
            
                await User.findOneAndUpdate(
                    { _id: context.book.bookId },
                    { $pull: { savedBooks: book.bookId } }
                );

                return book;
            }
            return AuthenticationError;
        },
    },
};

module.exports = resolvers;