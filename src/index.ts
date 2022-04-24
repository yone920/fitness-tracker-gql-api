import express, { Application, Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from "./typeDef/index.graphql";
import resolvers from './resolvers/index.resolver'
const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

async function startServer() {
  const app: Application = express()
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({app, path: "/fitness"})

  app.use((req: Request, res: Response) => {
    console.log(req)
    res.send('Hello from express apollo server')
  })

  const conn = await mongoose.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  console.log(`MongoDB Connected: ${conn.connection.host}`)

  app.listen(4000, () => console.log("server running on port 4000"))
}

startServer()