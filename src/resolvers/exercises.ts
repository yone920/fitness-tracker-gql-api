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
    createExercise: async (parent: void, args: exerciseInput, context: void, info: void) => {
      console.log(parent)
      console.log(context)
      console.log(info)
      const { activity, description, distance } = args.exercise;
      const exercise = new Exercise({activity, description, distance})
      await exercise.save()
      return exercise;
    }
  }
}

export default resolvers;