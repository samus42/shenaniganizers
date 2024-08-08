const {getRaidsCollection, formatOutput} = require('../mongo')
const _ = require('lodash')

const getUserRaidHistory = async (destinyId) => {
    const collection = await getRaidsCollection()
    const results = await collection
        .find({'roster.destinyId': destinyId})
        .map(formatOutput)
        .toArray()

    return _.sortBy(results, 'date')
}

module.exports = getUserRaidHistory
