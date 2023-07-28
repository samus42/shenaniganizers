const { getEmoteConfigsCollection, formatOutput, getObjectID } = require('../mongo')

const loadEmoteConfig = async (id) => {
    const collection = await getEmoteConfigsCollection()
    const result = await collection.findOne({ _id: getObjectID(id) })
    console.log('id: ', id)
    console.log('result: ', result)
    return formatOutput(result)
}

module.exports = loadEmoteConfig