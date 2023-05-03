const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createYoga } = require('graphql-yoga')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const resolvers = require('./resolvers')

const typeDefs = fs.readFileSync(path.join(__dirname, './schema.graphqls'), 'utf8')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const yoga = createYoga({ schema, graphqlEndpoint: '/' })

module.exports = { yoga }