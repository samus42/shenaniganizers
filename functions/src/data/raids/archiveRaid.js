const { getRaidsCollection, getObjectID, formatOutput } = require('../mongo')

const archiveRaid = async (id) => {
    const collection = await getRaidsCollection()
    const existing = await collection.findOne({ _id: getObjectID(id) })
    if (!existing) {
        throw new Error(`No raid with id ${id} exists!`)
    }
    await collection.updateOne({ _id: getObjectID(id) }, { $set: { active: false } })
    return formatOutput({ ...existing, active: false })
}

module.exports = archiveRaid