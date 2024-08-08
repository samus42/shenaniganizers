const {getRaidsCollection, formatOutput} = require('../mongo')
const _ = require('lodash')

const getRaids = async () => {
    const collection = await getRaidsCollection()
    const results = await collection.find({active: true}).map(formatOutput).toArray()
    return _.sortBy(results, 'date')
}

module.exports = getRaids
