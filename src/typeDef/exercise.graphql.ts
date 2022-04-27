const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Exerceise {
    id: String
    activity: String
    description: String
    distance: Int
  }

  type Query {
    getAllExerceises: [Exerceise]
  }

  input ExerciseInput {
    activity: String
    description: String
    distance: Int
  }

  type Mutation {
    createExercise(exercise: ExerciseInput): Exerceise
  }
`

export default typeDefs