const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type User {
    id: String
    fullName: String
    email: String!
    password: String!
    token: String
  }

  type Query {
    getAllUsers: [User]
    getAUser(userId: String): User
  }

  input UserRegisterInput {
    fullName: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Mutation {
    registerUser(user: UserRegisterInput): User
    deleteUser(UserId: String): User
  }

`

export default typeDefs