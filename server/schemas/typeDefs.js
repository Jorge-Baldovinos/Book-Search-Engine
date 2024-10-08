const typeDefs = /* GraphQL */`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Book {
        bookId: String!
        author: [String]!
        description: String!
        title: String!
        image: String!
        link: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: [User]!
    }

    input BookInput {
        author: [String],
        description: String!,
        title: String!,
        bookId: String!,
        image: String!,
        link: String!,
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;