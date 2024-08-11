import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {TextField, Typography} from '@mui/material'
import dayjs from 'dayjs'
import {useEffect, useState} from 'react'
import {getLostSector} from './lostSectors'
import {getOnslaught} from './onslaught'

const KeyValue = ({label, value}) => (
    <div style={{display: 'flex'}}>
        <div style={{width: '10ch'}}>{label}:</div>
        <div>{value}</div>
    </div>
)
const LostSector = ({date}) => {
    const lostSector = getLostSector(date)
    return (
        <div>
            <Typography variant="h5">Lost Sector</Typography>
            <div style={{paddingLeft: '10px'}}>
                <div>
                    <strong>{lostSector.name}</strong> ({lostSector.area})
                </div>
                <KeyValue label="Threat" value={lostSector.threat} />
                <KeyValue label="Shields" value={lostSector.shields.join(', ')} />
                <KeyValue label="Champions" value={lostSector.champions.join(', ')} />
                <KeyValue label="Reward" value={lostSector.reward} />
            </div>
        </div>
    )
}

// const Wellspring = ({date}) => {
//     const wellspring = getWellspring(date)
//     return (
//         <div>
//             <Typography variant="h5">Wellspring</Typography>
//             <div style={{paddingLeft: '10px'}}>
//                 <div>
//                     <strong>{wellspring.stage}</strong> ({wellspring.boss})
//                 </div>
//                 <div>Reward: {wellspring.reward}</div>
//             </div>
//         </div>
//     )
// }

const Onslaught = ({date}) => {
    const onslaught = getOnslaught(date)
    return (
        <div>
            <Typography variant="h5">Onslaught</Typography>
            <div style={{paddingLeft: '10px'}}>
                <div>
                    <strong>{onslaught.boss}</strong>{' '}
                </div>
            </div>
        </div>
    )
}

// const LegendaryActivity = ({ date }) => {
//     const { heist, remaining } = getLegendActivity(date)
//     return (
//         <div>
//             <Typography variant="h5">Legendary Defiant Battleground (weekly)</Typography>
//             <div style={{ paddingLeft: '10px' }}>
//                 <div><strong>{heist}</strong></div>
//                 <div>Chances left this season: {remaining}</div>
//             </div>
//         </div>
//     )
// }
const DisplayRotation = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs())
    useEffect(() => {
        const fifteenMinutes = 900000
        const interval = setInterval(() => {
            const today = dayjs()
            if (dayjs(selectedDate).isBefore(today, 'day')) {
                setSelectedDate(today)
            }
        }, fifteenMinutes)
        return () => clearInterval(interval)
    }, [selectedDate])
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{alignSelf: 'center', paddingRight: '20px'}}>
                    <Typography variant="h4">Daily Activities</Typography>
                </div>
                <div>
                    <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        label="Date"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
            </div>

            <div style={{paddingLeft: '0px'}}>
                <div>
                    <LostSector date={selectedDate} />
                </div>
                {/* <div style={{ marginTop: '20px' }}>
                    <Wellspring date={selectedDate} />
                </div> */}
                <div style={{marginTop: '20px'}}>
                    <Onslaught date={selectedDate} />
                </div>
            </div>
            <div style={{marginTop: '20px'}}>
                <strong>Note:</strong> This reflects the activity after the daily reset on the
                selected day.
            </div>
        </div>
    )
}

export default DisplayRotation
