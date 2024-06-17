const { default: ical } = require('ical-generator')
const moment = require('moment')
const getRaids = require('../data/raids/getRaids')
const getActivities = require('../data/activities/getActivities')

const raidToEvent = (raid) => {
    const raidDate = moment(raid.date)
    return {
        id: raid.id,
        start: raidDate,
        end: moment(raidDate).add(90, 'minutes'),
        summary: raid.raidName,
        description: raid.instanceName,
        location: 'Destiny 2',
        url: `https://shenaniganizers.com/raid/${raid.id}`
    }
}

const activityToEvent = (activity) => {
    const activityDate = moment(activity.date)
    return {
        id: activity.id,
        start: activityDate,
        end: moment(activityDate).add(90, 'minutes'),
        summary: activity.type === 'custom' ? activity.instanceName : activity.activityName,
        description: activity.instanceName,
        location: 'Online',
        url: `https://shenaniganizers.com/event/${activity.id}`
    }
}
const raidCalendarHandler = async (req, res) => {
    const raids = await getRaids()
    const events = raids.map(raidToEvent)
    const cal = ical({ domain: 'shenaniganizers.com', name: 'Shenaniganizers Raid Calendar', events })

    cal.serve(res)
}

const allEventsHandler = async (req, res) => {
    const [raids, activities] = await Promise.all([getRaids(), getActivities()])
    const events = raids.map(raidToEvent).concat(activities.map(activityToEvent))
    const cal = ical({ domain: 'shenaniganizers.com', name: 'Shenaniganizers Calendar', events })
    cal.serve(res)
}

module.exports = { raidCalendarHandler, allEventsHandler }