const express = require('express')
require('dotenv').config()
const resolvers = require('./resolvers')
const { getDB } = require('./data/mongo')
const { yoga } = require('./yoga')
const restRoutes = require('./rest')

const app = express()

app.use('/rest', restRoutes)

app.use('/', yoga)

getDB().then(() => {
    app.listen({ port: 4000 }, () => {
        console.log('Server ready at localhost:4000')
    })
})