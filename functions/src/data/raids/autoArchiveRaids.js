const {getRaidsCollection} = require('../mongo')
const _ = require('lodash')
const moment = require('moment')

const autoArchiveRaids = async () => {
    const collection = await getRaidsCollection()

    const results = await collection.updateMany(
        {active: true, date: {$lt: moment().subtract(7, 'days').toISOString()}},
        {$set: {active: false}}
    )
    return results
}

module.exports = autoArchiveRaids
