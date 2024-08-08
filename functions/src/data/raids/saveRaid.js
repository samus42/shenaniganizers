const _ = require('lodash')
const {getRaidsCollection, getObjectID} = require('../mongo')

const saveRaid = async (raid) => {
    const collection = await getRaidsCollection()

    if (raid.id) {
        const existing = await collection.findOne({_id: getObjectID(raid.id)})
        if (!existing) {
            throw new Error(`No raid with id ${raid.id} exists!`)
        }
        if (existing.version && existing.version !== raid.version) {
            throw new Error('Version mismatch, your record is out of date.')
        }
        raid.version = (raid.version || 0) + 1
        await collection.updateOne({_id: getObjectID(raid.id)}, {$set: _.omit(raid, ['id'])})
        return raid
    } else {
        const result = await collection.insertOne({...raid, active: true})
        return {id: result.insertedId.toString(), ...raid}
    }
}

module.exports = saveRaid
