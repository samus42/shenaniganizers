import dayjs from 'dayjs'

export const FirstDayOfOnslaughtRotation = dayjs('2024-04-09')
const onslaughtRotations = [
    {boss: `Siegehook Ogre`},
    {boss: `Fallen Warpriest`},
    {boss: `Fieldrazer Tormentor`}
]

export const getOnslaught = (date) => {
    const diff = dayjs(date).diff(FirstDayOfOnslaughtRotation, 'week')
    return onslaughtRotations[diff % onslaughtRotations.length]
}
