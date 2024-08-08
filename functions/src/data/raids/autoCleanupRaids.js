const {getRaidsCollection} = require('../mongo')
const _ = require('lodash')

const autoCleanupRaids = async () => {
    const collection = await getRaidsCollection()

    const results = await collection.deleteMany({
        $expr: {$lte: [{$size: '$roster'}, 5]},
        active: false
    })
    return results
}

module.exports = autoCleanupRaids
