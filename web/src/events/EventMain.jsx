import {useState, useEffect, useLayoutEffect} from 'react'
import {DesktopMain} from './desktop/DesktopMain'
import {MobileMain} from './mobile/MobileMain'
import {useNavigate, useParams} from 'react-router'
import {loadActivity, saveActivity, archiveActivity} from '../api/clan'
import {Snackbar, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ErrorDialog from '../ErrorDialog'
import {isEmpty} from 'lodash'
import _ from 'lodash'
import dayjs from 'dayjs'
import {SelectActivity} from './SelectActivity'
import {getCurrentUserInfo} from '../user/currentUser'

export function EventMain() {
    const [screenLayout, setScreenLayout] = useState('desktop')
    const navigate = useNavigate()
    const [activity, setActivity] = useState(null)
    const [instanceName, setInstanceName] = useState('')
    const [maxPlayers, setMaxPlayers] = useState(6)
    const [date, setDate] = useState(dayjs())
    const [currentRoster, setCurrentRoster] = useState([])
    const [backupRoster, setBackupRoster] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [saveEnabled, setSaveEnabled] = useState(false)
    const [saveMessage, setSaveMessage] = useState(null)
    const [error, setError] = useState(null)
    const [reloadFlag, setReloadFlag] = useState(1)
    const {activityKey} = useParams()
    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 1025) {
                setScreenLayout('mobile')
            } else {
                setScreenLayout('desktop')
            }
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    useEffect(() => {
        const getActivity = async () => {
            try {
                console.log('loading: ', activityKey)
                const loaded = await loadActivity(activityKey)
                console.log('loaded: ', loaded)
                setActivity(loaded)
                setInstanceName(loaded.instanceName)
                setDate(dayjs(loaded.date))
                setCurrentRoster(loaded.players)
                setBackupRoster(loaded.backups)
                setMaxPlayers(loaded.maxPlayers)
                setIsLoading(false)
                setSaveEnabled(true)
            } catch (err) {
                console.error(err)
                setError(err)
            }
        }
        setIsLoading(true)
        if (activityKey === 'new') {
            const user = getCurrentUserInfo()
            if (user) {
                setCurrentRoster([{name: user.name, id: user.destinyId, type: 'destiny'}])
            }
            setIsLoading(false)
            setSaveEnabled(false)
        } else {
            getActivity()
        }
    }, [activityKey, reloadFlag])

    const onDetailsChange = (details) => {
        setInstanceName(details.instanceName)
        setDate(details.date)
        setMaxPlayers(details.maxPlayers)
        setSaveEnabled(!isEmpty(details.instanceName?.trim()) && details.date)
    }

    const performSave = async (activityData) => {
        try {
            console.log('saving:', activityData)
            const isNew = !activity.id
            const updated = await saveActivity({
                ...activityData,
                date: activityData.date.toISOString()
            })
            setActivity(updated)
            if (isNew) {
                navigate(`/event/${updated.id}`)
                setSaveMessage(
                    'Activity saved! You can now share the URL in the browser with others.'
                )
            } else {
                setSaveMessage('Activity updates saved!')
            }
        } catch (err) {
            console.error(err)
            setError(err)
        }
    }
    const onSave = async () => {
        await performSave({
            ...activity,
            players: currentRoster,
            backups: backupRoster,
            instanceName,
            date,
            maxPlayers
        })
    }

    const onArchive = async () => {
        await archiveActivity(activity)
        setActivity({...activity, active: false})
    }

    const onRosterChange = async (newRoster) => {
        setCurrentRoster(newRoster)
        if (saveEnabled) {
            await performSave({
                ...activity,
                players: newRoster,
                backups: backupRoster,
                instanceName,
                date
            })
        }
    }

    const onActivityChange = async (newActivity) => {
        const updated = {...newActivity, id: activity?.id, version: activity?.version}
        let newBackups = backupRoster
        let newCurrent = currentRoster
        if (currentRoster.length > updated.maxPlayers) {
            const addToBackup = _.takeRight(
                currentRoster,
                currentRoster.length - updated.maxPlayers
            )
            console.log('addToBackup: ', addToBackup)
            newBackups = backupRoster.concat(addToBackup)
            console.log('newBackups: ', newBackups)
            newCurrent = _.take(currentRoster, updated.maxPlayers)
            setCurrentRoster(newCurrent)
            setBackupRoster(newBackups)
        }
        setActivity(updated)
        setMaxPlayers(updated.maxPlayers)
        if (saveEnabled) {
            await performSave({
                ...updated,
                players: newCurrent,
                backups: newBackups,
                instanceName,
                date
            })
        }
    }
    const onBackupRosterChange = async (newBackups) => {
        setBackupRoster(newBackups)
        if (saveEnabled) {
            await performSave({
                ...activity,
                players: currentRoster,
                backups: newBackups,
                instanceName,
                date
            })
        }
    }
    const onErrorDialogClose = (action) => {
        if (action === 'reload') {
            // refresh page
            window.location.reload()
            setReloadFlag(reloadFlag + 1)
        }
        setError(null)
    }

    if (activityKey === 'new' && !activity) {
        return (
            <div style={{paddingTop: '10px'}}>
                <SelectActivity
                    onSelect={(activity) => onActivityChange(activity)}
                    onCancel={() => navigate('/')}
                />
            </div>
        )
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    const ViewComponent = screenLayout === 'mobile' ? MobileMain : DesktopMain
    return (
        <div>
            <ErrorDialog error={error} onClose={onErrorDialogClose} />
            <ViewComponent
                roster={currentRoster}
                backupRoster={backupRoster}
                date={date}
                instanceName={instanceName}
                maxPlayers={maxPlayers}
                activity={activity}
                saveEnabled={saveEnabled}
                onChangeActivity={onActivityChange}
                onSave={onSave}
                onArchive={onArchive}
                onDetailsChange={onDetailsChange}
                onRosterChange={onRosterChange}
                onBackupRosterChange={onBackupRosterChange}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={!!saveMessage}
                onClose={() => setSaveMessage(null)}
                message={saveMessage}
                autoHideDuration={6000}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => setSaveMessage(null)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    )
}
