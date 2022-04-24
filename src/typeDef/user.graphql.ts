const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    getAllUsers: [User]
    getAUser(userId: String): User
  }

  input UserRegisterInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Mutation {
    registerUser(user: UserRegisterInput): User
    deleteUser(UserId: String): User
  }
`

export default typeDefs