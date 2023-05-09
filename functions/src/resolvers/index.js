const packageJSON = require('../../package.json')
const saveRaid = require('../data/raids/saveRaid')
const loadRaid = require('../data/raids/loadRaid')
const archiveRaid = require('../data/raids/archiveRaid')
const getRaids = require('../data/raids/getRaids')
const getUserRaidHistory = require('../data/raids/getUserRaidHistory')
const saveActivity = require('../data/activities/saveActivity')
const loadActivity = require('../data/activities/loadActivity')
const archiveActivity = require('../data/activities/archiveActivity')
const getActivities = require('../data/activities/getActivities')
const { sendRaidMessage } = require('../discord/webhook')

const resolvers = {
    Query: {
        version() {
            return packageJSON.version
        },
        getRaid(root, { id }) {
            return loadRaid(id)
        },
        async listRaids() {
            return getRaids()
        },
        userRaidHistory(root, { destinyId }) {
            return getUserRaidHistory(destinyId)
        },
        getActivity(root, { id }) {
            return loadActivity(id)
        },
        listActivities() {
            return getActivities()
        }
    },
    Mutation: {
        async saveRaid(root, { raid }) {
            let original = null
            if (raid.id) {
                try {
                    original = await loadRaid(raid.id)
                } catch (err) {
                    console.warn('Error loading raid for update: ', raid.id)
                    console.warn(err)
                }
            }
            const updated = await saveRaid(raid)
            try {
                let title = null
                if (original && raid.date !== original.date) {
                    title = 'Raid Date/Time updated!'
                } else if (!original) {
                    title = 'New Raid Posted!'
                }
                if (title) {
                    await sendRaidMessage(title, raid)
                }
            } catch (err) {
                console.warn('Error sending message to discord')
                console.warn(err)
            }
            return updated
        },
        archiveRaid(root, { id }) {
            return archiveRaid(id)
        },
        saveActivity(root, { activity }) {
            return saveActivity(activity)
        },
        archiveActivity(root, { id }) {
            return archiveActivity(id)
        }
    }
}

module.exports = resolvers