const { getActivitiesCollection, formatOutput, getObjectID } = require('../mongo')
const _ = require('lodash')
const moment = require('moment')

const autoArchiveActivities = async () => {
    const collection = await getActivitiesCollection()

    const results = await collection.updateMany(
        { active: true, date: { $lt: moment().subtract(7, 'days').toISOString() } },
        { $set: { active: false } }
    )
    return results
}

module.exports = autoArchiveActivities