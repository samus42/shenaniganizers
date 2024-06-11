export const Games = {
    Destiny: 'Destiny',
    AmongUs: 'Among Us',
    Custom: 'Custom'
}

export function getGames() {
    return Object.values(Games).sort()
}
const DestinyRaid = {
    game: Games.Destiny,
    type: 'Raid',
    maxPlayers: 6
}

const DestinyDungeon = {
    game: Games.Destiny,
    type: 'Dungeon',
    maxPlayer: 3
}

const DestinyIronBanner = {
    game: Games.Destiny,
    type: 'Iron Banner',
    maxPlayers: 6
}

const AmongUs = {
    game: Games.AmongUs,
    type: 'Among Us',
    maxPlayers: 15
}

const Custom = {
    game: Games.Custom,
    type: 'Custom',
    maxPlayers: 30,
    options: {
        canChangeTitle: true,
        canSetMaxPlayers: true
    }
}

const createActivity = (template, title, imagePath, target) => ({ game: template.game, type: template.type, maxPlayers: template.maxPlayers, options: template.options, title, imagePath, target })
export function getActivities() {
    return [
        createActivity(DestinyRaid, 'Root of Nightmares', '/activities/nightmares.png', '/raid/nightmare'),
        createActivity(DestinyRaid, "Taken King", "/activities/takenking.png", '/raid/ttk'),
        createActivity(DestinyRaid, "Vow Of The Disciple", "/activities/disciple.png", '/raid/disciple'),
        createActivity(DestinyRaid, "Vault Of Glass", "/activities/vaultofglass.png", '/raid/vault'),
        createActivity(DestinyRaid, "Deep Stone Crypt", "/activities/deepstonecrypt.png", '/raid/crypt'),
        createActivity(DestinyRaid, "Garden Of Salvation", "/activities/garden.png", '/raid/garden'),
        createActivity(DestinyRaid, "Last Wish", "/activities/lastwish.png", '/raid/wish'),
        createActivity(AmongUs, "Among Us", "/activities/amongus.png", '/activity/amongus'),
        createActivity(Custom, "Custom Activity", "/activities/custom.png", '/activity/custom'),
        createActivity(DestinyRaid, `Crota's End`, "/activities/crota.png", '/raid/crota'),
        createActivity(DestinyRaid, "Wrath Of The Machine", "/activities/wrathofthemachine.png", '/raid/wrath')
    ]
}