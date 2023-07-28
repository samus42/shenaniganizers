const { getEmoteConfigsCollection, formatOutput, getObjectID } = require('../mongo')
const _ = require('lodash')

const getEmoteConfigs = async () => {
    const collection = await getEmoteConfigsCollection()
    const results = await collection.find({}).map(formatOutput).toArray()
    return _.sortBy(results, (r) => r.player.name)
}

module.exports = getEmoteConfigs