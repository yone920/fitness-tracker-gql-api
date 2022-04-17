const Exercise = require('./models/Exercise.model')

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World'
    },
    getAllExerceises: async () => {
      return await Exercise.find()
    }
  },
  Mutation: {
    createExercise: async (parent, args, context, info) => {
      const { activity, description, distance } = args.exercise;
      console.log('args', args)
      const exercise = new Exercise({activity, description, distance})
      await exercise.save()
      return exercise;
    }
  }
}

module.exports = resolvers