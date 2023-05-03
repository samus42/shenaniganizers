const { getRaidsCollection, formatOutput, getObjectID } = require('../mongo')

const loadRaid = async (id) => {
    const collection = await getRaidsCollection()
    const result = await collection.findOne({ _id: getObjectID(id) })
    return formatOutput(result)
}

module.exports = loadRaid