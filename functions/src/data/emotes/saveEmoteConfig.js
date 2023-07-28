const _ = require('lodash')
const { getEmoteConfigsCollection, getObjectID, formatOutput } = require('../mongo')

const saveEmoteConfig = async (emoteConfig) => {
    const collection = await getEmoteConfigsCollection()

    if (emoteConfig.id) {
        const existing = await collection.findOne({ _id: getObjectID(emoteConfig.id) })
        if (!existing) {
            throw new Error(`No emote config with id ${emoteConfig.id} exists!`)
        }
        await collection.updateOne({ _id: getObjectID(emoteConfig.id) }, { $set: _.omit(emoteConfig, ['id']) })
        return emoteConfig
    } else {
        const result = await collection.insertOne(emoteConfig)
        return { id: result.insertedId.toString(), ...emoteConfig }
    }
}

module.exports = saveEmoteConfig