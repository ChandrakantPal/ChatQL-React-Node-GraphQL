const { ApolloServer, gql } = require('apollo-server')

// The GraphQL schema

// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolver')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
