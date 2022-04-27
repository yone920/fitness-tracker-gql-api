import { ApolloError } from 'apollo-server-express'
import { User } from '../models/User.model'
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken'
const dotenv = require("dotenv")

dotenv.config()
interface UserRegisterInput {
  user: {
    fullName: string
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
      const { fullName, email, password } = args.user;
      try {
        const olduser = await User.findOne({email})

        //throw error if user exists
        if (olduser) {
          throw new ApolloError('A user is already registerd with the email ' + email, 'USER_ALREADY_EXISTS')
        }

        // Encrypt password
        let encryptedPassword = await bcrypt.hash(password, 10)

        // uild mongoose model (User)
        const newUser = new User({fullName, email: email.toLowerCase(), password: encryptedPassword})

        // Create JWT token
        const token = jwt.sign(
          {user_id: newUser.id, email},
          "secret__",
          {
            expiresIn: "2h"
          }
        )

        newUser.token = token;
        // Save new user into the DB
        const res = await newUser.save()
        // Return the newly created user
        return {
          id: res.id,
          ...res._doc
        };

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