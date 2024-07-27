import dayjs from 'dayjs'
import { Areas, Elements, Champions } from '../constants'

const { Void, Solar, Arc, Strand, Unknown } = Elements
const { Overload, Unstoppable, Barrier } = Champions

const sector = (name, area, threat, shields, champions) => ({ name, area, threat, shields, champions })

export const Rewards = {
    Chest: 'Chest',
    Head: 'Helmet',
    Legs: 'Legs',
    Arms: 'Arms'
}

export const FirstDayOfLostSectorRotation = dayjs('2024-07-25')

// const K1Revelation = sector(`K1 Revelation`, Areas.Moon, Void, [Arc], [Barrier, Unstoppable])
// const K1CrewQuarters = sector(`K1 Crew Quarters`, Areas.Moon, Arc, [Solar], [Barrier, Overload])
// const K1Logistics = sector(`K1 Logistics`, Areas.Moon, Void, [Arc, Solar], [Barrier, Overload])
// const K1Communion = sector(`K1 Communion`, Areas.Moon, Solar, [Solar, Void], [Barrier, Overload])
// const Sepulcher = sector(`Sepulcher`, Areas.ThroneWorld, Solar, [Arc, Solar], [Barrier, Unstoppable])
// const Extraction = sector(`Extraction`, Areas.ThroneWorld, Arc, [Arc, Void], [Overload, Unstoppable])
// const Metamorphosis = sector('Metamorphosis', Areas.ThroneWorld, Arc, [Arc, Solar], [Overload, Unstoppable])
const AphelionsRest = sector(`Aphelion's Rest`, Areas.DreamingCity, Solar, [Void], [Overload, Unstoppable])
const ChamberOfStarlight = sector(`Chamber of Starlight`, Areas.DreamingCity, Solar, [Solar, Void], [Overload, Unstoppable])
const BayOfDrownedWishes = sector(`Bay of Drowned Wishes`, Areas.DreamingCity, Solar, [Void], [Overload, Unstoppable])
const VelesLabyrinth = sector('Veles Labyrinth', Areas.Cosmodrome, Arc, [Arc, Solar], [Barrier, Unstoppable])
const ExodusGarden2A = sector('Exodus Garden 2A', Areas.Cosmodrome, Void, [Void], [Barrier, Overload])
const ConcealedVoid = sector('Concealed Void', Areas.Europa, Solar, [Solar, Void], [Barrier, Overload])
const BunkerE15 = sector('Bunker E15', Areas.Europa, Void, [Void], [Barrier, Overload])
const Perdition = sector('Perdition', Areas.Europa, Arc, [Arc, Void], [Barrier, Overload])
const Thrilladome = sector('Thrilladrome', Areas.Neptune, Void, [Arc, Void], [Barrier, Overload])
const GildedPrecept = sector('Gilded Precept', Areas.Neptune, Arc, [Solar, Void], [Barrier, Unstoppable])
const ScavengersDen = sector(`Scavenger's Den`, Areas.EDZ, Solar, [Arc], [Barrier, Overload])
const SkydockIV = sector(`Skydock IV`, Areas.EDZ, Solar, [Void], [Barrier, Unstoppable])
const TheQuarry = sector(`The Quarry`, Areas.EDZ, Void, [Solar, Void], [Barrier, Unstoppable])

const TheBrokenDeep = sector('The Broken Deep', Areas.PaleHeart, Strand, [Arc, Solar], [Unstoppable, Overload])
const TheBloomingDeep = sector('The Blooming Deep', Areas.PaleHeart, Arc, [Arc, Solar], [Unstoppable, Overload])
const TheForgottenDeep = sector('The Forgotten Deep', Areas.PaleHeart, Arc, [Arc], [Barrier, Unstoppable])
const TheConflux = sector('The Conflux', Areas.Nessus, Solar, [Void], [Barrier, Unstoppable])
const HyrdoponicsDelta = sector('Hydroponics Delta', Areas.Neptune, Void, [], [Barrier, Unstoppable])

/*
const ExcavationSiteXII = sector(`Excavation Site XII`, Areas.EDZ, Solar, [Arc], [Barrier, Unstoppable])
*/

const sectorRotation = [
    ExodusGarden2A,
    TheBrokenDeep,
    TheBloomingDeep,
    TheForgottenDeep,
    Perdition,
    BunkerE15,
    ConcealedVoid,
    TheConflux,
    Thrilladome,
    HyrdoponicsDelta,
    VelesLabyrinth,
]
/*
sector('Concealed Void', Areas.Europa),
 sector(`Metamorphosis`, Areas.ThroneWorld),
 sector('The Rift', Areas.Nessus),
*/
const rewardRotation = [
    Rewards.Arms,
    Rewards.Chest,
    Rewards.Head,
    Rewards.Legs,
]

export const getLostSector = (date) => {
    const diff = dayjs(date).diff(FirstDayOfLostSectorRotation, 'day')
    const sector = sectorRotation[diff % sectorRotation.length]
    const reward = rewardRotation[diff % rewardRotation.length]

    return { ...sector, reward }
}