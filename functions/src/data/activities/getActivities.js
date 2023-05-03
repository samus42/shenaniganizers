const { getActivitiesCollection, formatOutput, getObjectID } = require('../mongo')
const _ = require('lodash')

const getActivities = async () => {
    const collection = await getActivitiesCollection()
    const results = await collection.find({ active: true }).map(formatOutput).toArray()
    return _.sortBy(results, 'date')
}

module.exports = getActivities