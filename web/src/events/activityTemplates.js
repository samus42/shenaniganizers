export const Games = {
    Destiny: 'Destiny',
    AmongUs: 'Among Us',
    Helldivers2: 'Helldivers 2',
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
    maxPlayers: 3
}

const DestinyExoticQuest = {
    game: Games.Destiny,
    type: 'Exotic Quest',
    maxPlayers: 3
}

const DestinyFullSquadPvP = {
    game: Games.Destiny,
    type: '6-on-6 PvP',
    maxPlayers: 6
}

const DestinyFireteamPvP = {
    game: Games.Destiny,
    type: '3-on-3 PvP',
    maxPlayers: 3
}

const AmongUs = {
    game: Games.AmongUs,
    type: 'Pure Chaos',
    maxPlayers: 15
}

const Helldivers2 = {
    game: Games.Helldivers2,
    type: 'For Democracy!',
    maxPlayers: 4
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

const createActivity = (template, title, imagePath) => ({
    game: template.game,
    type: template.type,
    maxPlayers: template.maxPlayers,
    options: template.options,
    activityName: title,
    imagePath,
    active: true
})
export function getActivities() {
    return [
        createActivity(DestinyRaid, 'Root of Nightmares', '/activities/nightmares.png'),
        createActivity(DestinyRaid, 'Taken King', '/activities/takenking.png'),
        createActivity(DestinyRaid, 'Vow Of The Disciple', '/activities/disciple.png'),
        createActivity(DestinyRaid, 'Vault Of Glass', '/activities/vaultofglass.png'),
        createActivity(DestinyRaid, 'Deep Stone Crypt', '/activities/deepstonecrypt.png'),
        createActivity(DestinyRaid, 'Garden Of Salvation', '/activities/garden.png'),
        createActivity(DestinyRaid, 'Last Wish', '/activities/lastwish.png'),
        createActivity(DestinyRaid, "Salvation's Edge", '/activities/salvations-edge.png'),
        createActivity(AmongUs, 'Among Us', '/activities/amongus.png'),
        createActivity(Custom, 'Custom Activity', '/activities/custom.png'),
        createActivity(DestinyRaid, `Crota's End`, '/activities/crota.png'),
        createActivity(DestinyRaid, 'Wrath Of The Machine', '/activities/wrathofthemachine.png'),
        createActivity(DestinyDungeon, 'Warlords Ruin', '/activities/warlords-ruin.png'),
        createActivity(DestinyDungeon, 'Ghosts of the Deep', '/activities/ghosts-of-the-deep.png'),
        createActivity(DestinyDungeon, 'Shattered Throne', '/activities/shattered-throne.png'),
        createActivity(DestinyDungeon, 'Pit Of Heresy', '/activities/pit-of-heresy.png'),
        createActivity(DestinyDungeon, 'Grasp Of Avarice', '/activities/grasp-of-avarice.png'),
        createActivity(DestinyDungeon, 'Duality', '/activities/duality.png'),
        createActivity(DestinyExoticQuest, 'Zero Hour', '/weapons/outbreak-perfected.png'),
        createActivity(DestinyExoticQuest, 'The Whisper', '/weapons/whisper-of-the-worm.png'),
        createActivity(DestinyFullSquadPvP, 'Iron Banner', '/activities/iron-banner.png'),
        createActivity(DestinyFireteamPvP, 'Trials of Osiris', '/activities/trials-of-osiris.png'),
        createActivity(Helldivers2, 'Helldivers 2 Run', '/activities/helldivers2.png')
    ]
}
