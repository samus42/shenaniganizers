const _ = require('lodash')
const { getDB, getObjectID, formatOutput, getActivitiesCollection } = require('../mongo')

const saveActivity = async (activity) => {
    try {
        // console.log('saving: ', activity)
        const collection = await getActivitiesCollection()

        if (activity.id) {
            const existing = await collection.findOne({ _id: getObjectID(activity.id) })
            if (!existing) {
                throw new Error(`No activity with id ${activity.id} exists!`)
            }
            if (existing.version !== activity.version) {
                throw new Error('Version mismatch, your record is out of date.')
            }
            activity.version = activity.version + 1
            await collection.updateOne({ _id: getObjectID(activity.id) }, { $set: _.omit(activity, ['id']) })
            return activity
        } else {
            const result = await collection.insertOne({ ...activity, version: 1, active: true })
            return { id: result.insertedId.toString(), version: 1, ...activity }
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = saveActivity