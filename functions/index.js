const functions = require('firebase-functions')
const express = require('express')
const path = require('path')
require('dotenv').config()
const restRoutes = require('./src/rest')
const autoArchive = require('./src/scheduled/autoArchive')
const { yoga } = require('./src/yoga')

const app = express()
app.use('/rest', restRoutes)
app.use('/', yoga)

exports.api = functions.https.onRequest(app)

exports.scheduledFunctionAutoArchive = functions.pubsub.schedule('every day 00:00').onRun(autoArchive)
