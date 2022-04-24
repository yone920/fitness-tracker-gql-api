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
      try {
        return await Exercise.find()
      } catch (error) {
        console.error(error)
      }
    }
  },
  Mutation: {
    createExercise: async (_parent: any, args: exerciseInput, _context: any) => {
      const { activity, description, distance } = args.exercise;
      try {
        const exercise = new Exercise({activity, description, distance})
        await exercise.save()
        return exercise;
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default resolvers;