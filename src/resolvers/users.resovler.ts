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

interface LoginInput {
  user: {
    email: String
    password: String
  }
}

const tokenGenerator = (id: String, email: String) => (
  jwt.sign(
    {user_id: id, email},
    "secret__",
    {
      expiresIn: "2h"
    }
  )
)

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

        // Build mongoose model (User)
        const newUser = new User({fullName, email: email.toLowerCase(), password: encryptedPassword})

        // Create JWT token
        const token = tokenGenerator(newUser.id, email)

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
    },
    loginUser: async (_parent: any, args: LoginInput, _context: any) => {
      const {email, password} = args.user;

      const user = await User.findOne({email});

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create JWT token
        const token = tokenGenerator(user.id, email)

        user.token = token;
          // Return the newly created user
        return {
          id: user.id,
          ...user._doc
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
      }
    }
  }
}

export default resolvers;