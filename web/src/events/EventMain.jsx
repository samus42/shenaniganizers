import React, { useState, useEffect, useLayoutEffect } from 'react'
import { DesktopMain } from './desktop/DesktopMain'
import { MobileMain } from './mobile/MobileMain'
import { useNavigate, useParams } from 'react-router-dom'
import { loadActivity, saveActivity, archiveActivity } from '../api/clan'
import { Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ErrorDialog from '../ErrorDialog'
import isEmpty from 'lodash.isempty'
import { SelectActivity } from './SelectActivity'

export function EventMain() {
    const [screenLayout, setScreenLayout] = useState('desktop')
    const navigate = useNavigate()
    const [activity, setActivity] = useState(null)
    const [instanceName, setInstanceName] = useState('')
    const [maxPlayers, setMaxPlayers] = useState(6)
    const [date, setDate] = useState(new Date())
    const [currentRoster, setCurrentRoster] = useState([])
    const [backupRoster, setBackupRoster] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [saveEnabled, setSaveEnabled] = useState(false)
    const [saveMessage, setSaveMessage] = useState(null)
    const [error, setError] = useState(null)
    const [reloadFlag, setReloadFlag] = useState(1)
    const { activityKey } = useParams()
    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 1025) {
                setScreenLayout('mobile')
            }
            else {
                setScreenLayout('desktop')
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    useEffect(() => {
        const getActivity = async () => {
            try {
                console.log('loading: ', activityKey)
                const loaded = await loadActivity(activityKey)
                console.log('loaded: ', loaded)
                setActivity(loaded)
                setInstanceName(loaded.instanceName)
                setDate(new Date(loaded.date))
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
            setIsLoading(false)
            setSaveEnabled(false)
        } else {
            getActivity()
        }
    }, [activityKey, reloadFlag])

    useEffect(() => {
        if (activity) {
            setMaxPlayers(activity.maxPlayers)
            // TODO: if current roster is now larger than max players, move to backup
        }
    }, [activity])

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
            const updated = await saveActivity(activityData)
            setActivity(updated)
            if (isNew) {
                navigate(`/event/${updated.id}`)
                setSaveMessage('Activity saved! You can now share the URL in the browser with others.')
            } else {
                setSaveMessage('Activity updates saved!')
            }
        } catch (err) {
            console.error(err)
            setError(err)
        }
    }
    const onSave = async () => {
        await performSave({ ...activity, players: currentRoster, backups: backupRoster, instanceName, date: date.toISOString(), maxPlayers })
    }

    const onArchive = async () => {
        await archiveActivity(activity)
        setActivity({ ...activity, active: false })
    }

    const onRosterChange = async (newRoster, saveData = false) => {
        setCurrentRoster(newRoster)
        if (saveEnabled) {
            await performSave({ ...activity, players: newRoster, backups: backupRoster, instanceName, date })
        }
    }

    const onActivityChange = async (newActivity) => {
        const updated = { ...newActivity, id: activity?.id, version: activity?.version }
        setActivity(updated)
        if (saveEnabled) {
            await performSave({ ...updated, players: currentRoster, backups: backupRoster, instanceName, date })
        }
    }
    const onBackupRosterChange = async (newBackups, saveData = false) => {
        setBackupRoster(newBackups)
        if (saveEnabled) {
            await performSave({ ...activity, players: currentRoster, backups: newBackups, instanceName, date })
        }
    }
    const onErrorDialogClose = (action) => {
        if (action === 'reload') {
            //refresh page
            window.location.reload()
            setReloadFlag(reloadFlag + 1)
        }
        setError(null)
    }

    if (activityKey === 'new' && !activity) {
        return (
            <div style={{ paddingTop: '10px' }}>
                <SelectActivity onSelect={(activity) => setActivity(activity)} onCancel={() => navigate('/')} />
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
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
                onClose={evt => setSaveMessage(null)}
                message={saveMessage}
                autoHideDuration={6000}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={evt => setSaveMessage(null)}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    )
}
