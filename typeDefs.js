const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Exerceise {
    id: ID,
    activity: String,
    description: String,
    distance: Int
  }

  type Query {
    hello: String
    getAllExerceises: [Exerceise]
  }

  input ExerciseInput {
    activity: String,
    description: String,
    distance: Int
  }

  type Mutation {
    createExercise(exercise: ExerciseInput): Exerceise
  }
`

module.exports = typeDefs