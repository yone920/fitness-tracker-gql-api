import { User } from '../models/User.model'

interface UserRegisterInput {
  user: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

interface userId {
  userId: string
}

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        return await User.find()
      } catch (error) {
        console.error(error)
      }
    },
    getAUser: async (_parent: any, args: userId, _context: any) => {
      const {userId} = args
      try {
        return await User.findById(userId)
      } catch (error) {
        console.error(error)
      }
    }
  },
  Mutation: {
    registerUser: async (_parent: any, args: UserRegisterInput, _context: any) => {
      const { firstName, lastName, email, password } = args.user;
      try {
        const user = new User({firstName, lastName, email, password})
        await user.save()
        return user;
      } catch (error) {
        console.error(error)
      }
    },
    deleteUser: async (_parent: any, args: userId, _context: any) => {
      const {userId} = args
      try {
        return await User.deleteOne({id: userId})
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default resolvers;