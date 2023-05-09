const moment = require('moment-timezone')
const agent = require('superagent')

const thumbnailBase = 'https://shenaniganizers.com/activities'
const webhookUrl = process.env.DISCORD_WEBHOOK_URL
const raidBase = 'https://shenaniganizers.com/raid'

const Thumbnails = {
    'Deep Stone Crypt': 'deepstonecrypt.png',
    'Root of Nightmares': 'nightmares.png',
    'Taken King': 'takenking.png',
    'Vow Of The Disciple': 'disciple.png',
    'Vault Of Glass': 'vaultofglass.png',
    'Garden Of Salvation': 'garden.png',
    'Last Wish': 'lastwish.png',
    'Among Us': 'amongus.png',
    'Custom': 'chaos-aqua.png',
    "Crota's End": 'crota.png',
    'Wrath Of The Machine': 'wrathofthemachine.png'
}

async function sendRaidMessage(title, raid) {
    const date = moment(raid.date)
    const dateFormat = 'h:mma zz'
    const thumbnailImage = Thumbnails[raid.raidName] || 'chaos-aqua.png'
    const message = {
        "embeds": [
            {
                "title": title,
                "description": `${raid.instanceName} - ${raid.raidName}`,
                "url": `${raidBase}/${raid.id}`,
                "fields": [
                    {
                        "name": "Date",
                        "value": date.format('dddd, MMMM Do YYYY')
                    },
                    {
                        "name": "Time",
                        "value": `${date.tz('US/Eastern').format(dateFormat)} / ${date.tz('US/Central').format(dateFormat)} / ${date.tz('US/Pacific').format(dateFormat)}`,
                        "inline": true
                    }
                ],
                "thumbnail": {
                    "url": `${thumbnailBase}/${thumbnailImage}`
                }
            }
        ]
    }
    // console.log(JSON.stringify(moment.tz.names(), null, 2))
    await agent.post(webhookUrl).set('content-type', 'application/json').send(message)
}

module.exports = { sendRaidMessage }