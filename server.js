const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

async function startServer() {
  const app = express()
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({app, path: "/fitness"})

  app.use((req, res) => {
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