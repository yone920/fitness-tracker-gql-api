import { Exercise } from '../models/Exercise.model'

interface exerciseInput {
  exercise: {
    activity: string
    description: string
    distance: number
  }
}

const resolvers = {
  Query: {
    getAllExerceises: async () => {
      return await Exercise.find()
    }
  },
  Mutation: {
    createExercise: async (_parent: any, args: exerciseInput, _context: any) => {
      const { activity, description, distance } = args.exercise;
      const exercise = new Exercise({activity, description, distance})
      await exercise.save()
      return exercise;
    }
  }
}

export default resolvers;