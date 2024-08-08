const {getActivitiesCollection, formatOutput, getObjectID} = require('../mongo')

const loadActivity = async (id) => {
    const collection = await getActivitiesCollection()
    const result = await collection.findOne({_id: getObjectID(id)})
    return formatOutput(result)
}

module.exports = loadActivity
