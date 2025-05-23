import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router'
import {List, ListItemText, ListItemButton, Typography, Button} from '@mui/material'
import raidClient from '../api/raidClient'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import {sortBy} from 'lodash'

const query = gql`
    query {
        raids: listRaids {
            id
            raidName
            instanceName
            date
        }
        activities: listActivities {
            id
            type
            game
            activityName
            instanceName
            date
        }
    }
`
const EventListItem = ({activity, onClick}) => (
    <ListItemButton onClick={onClick}>
        <ListItemText
            primary={activity.instanceName}
            secondary={`${dayjs(activity.date).format('MM/DD/YYYY hh:mm a')}`}
        />
        <ListItemText secondary={activity.activityName} />
    </ListItemButton>
)

const EventList = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextLoadTime, setNextLoadTime] = useState(null)
    const [reloadFlag, setReloadFlag] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            if (new dayjs().isAfter(nextLoadTime)) {
                setReloadFlag(new Date().getTime())
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [nextLoadTime])

    useEffect(() => {
        const loadActivities = async () => {
            setLoading(true)
            const {data} = await raidClient.query({query, fetchPolicy: 'network-only'})
            const activities = data.activities.map((a) => ({...a, eventType: 'activity'}))
            const raids = data.raids.map((a) => ({
                ...a,
                eventType: 'raid',
                activityName: a.raidName
            }))
            setEvents(sortBy(activities.concat(raids), 'date'))
            setNextLoadTime(new dayjs().add(5, 'minutes'))
            setLoading(false)
        }
        loadActivities()
    }, [reloadFlag])

    if (loading) {
        return <div>Loading...</div>
    }
    const onSelectEvent = (event) => {
        if (event.eventType === 'activity') {
            if (event.game) {
                navigate(`/event/${event.id}`)
            } else {
                navigate(`/activity/${event.id}`)
            }
        } else {
            navigate(`/raid/${event.id}`)
        }
    }
    return (
        <div style={{maxWidth: '500px'}}>
            <Typography variant="h4">Upcoming events</Typography>
            {/* <div style={{ marginTop: '10px' }}>
                <Button style={{ width: '100%' }} variant="contained" onClick={onChooseActivity}>Organize An Activity</Button>
            </div> */}
            <div style={{marginTop: '10px'}}>
                <Link to={'/event/new'}>
                    <Button fullWidth variant="contained">
                        Organize An Activity
                    </Button>
                </Link>
            </div>
            {events.length < 1 && <div>No active events, you should schedule one!</div>}
            <List>
                {events.map((activity) => (
                    <EventListItem
                        key={activity.id}
                        onClick={() => onSelectEvent(activity)}
                        activity={activity}
                    />
                ))}
            </List>
            <div>
                Subscribe to the events calendar!{' '}
                <a href="/help/calendar" target="_blank">
                    Click here for help.
                </a>
            </div>
        </div>
    )
}

export default EventList
