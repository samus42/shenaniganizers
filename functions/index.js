const {onRequest} = require('firebase-functions/v2/https')
const {onSchedule} = require('firebase-functions/v2/scheduler')
const express = require('express')
require('dotenv').config()
const restRoutes = require('./src/rest')
const autoArchive = require('./src/scheduled/autoArchive')
const {yoga} = require('./src/yoga')

const app = express()
app.use('/rest', restRoutes)
app.use('/', yoga)

exports.apiSecondGen = onRequest(app)

exports.scheduledFunctionAutoArchiveSecondGen = onSchedule('every day 00:00', autoArchive)
