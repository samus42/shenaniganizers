import React, { useEffect, useState } from 'react'
import MobileRoster from '../desktop/DesktopRoster'
import MobileDetails from './MobileDetails'
import { Tabs, Tab, Typography, Divider } from '@mui/material'
import { SelectActivityDialogButton } from '../SelectActivity'

const tabs = {
    details: 0,
    roster: 1,
}

export function MobileMain({ roster, backupRoster, date, instanceName, maxPlayers, activity, saveEnabled, onSave, onArchive, onDetailsChange, onRosterChange, onBackupRosterChange, onChangeActivity }) {
    const [activeTab, setActiveTab] = useState(tabs.details)

    useEffect(() => {
        if (activity.id) {
            setActiveTab(tabs.roster)
        } else {
            setActiveTab(tabs.details)
        }
    }, [activity.id])

    const onUpdateRoster = async (newRoster) => {
        onRosterChange(newRoster, true)
    }

    const onUpdateBackups = async (newBackups) => {
        onBackupRosterChange(newBackups, true)
    }
    return (
        <div style={{ paddingRight: '5px', paddingLeft: '5px' }}>
            <div style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <img src={activity.imagePath} alt={activity.activityName} style={{ marginRight: '10px', width: '32px' }} />
                    <Typography variant="h5">{activity.activityName}</Typography>
                </div>
                <SelectActivityDialogButton buttonText='Change' onSelect={(act) => { onChangeActivity(act) }} onCancel={() => { }} />
            </div>
            <Divider />
            <Tabs indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                value={activeTab}
                onChange={(evt, newValue) => setActiveTab(newValue)}>
                <Tab label="Details" />
                <Tab label="Roster" />
            </Tabs>
            {!activity.active && <h2 style={{ padding: '5px' }}>This activity is longer active!</h2>}
            <div style={{ padding: '5px' }}>
                {activeTab === tabs.details && <MobileDetails activity={activity} date={date} instanceName={instanceName} maxPlayers={maxPlayers} saveEnabled={saveEnabled} onChange={onDetailsChange} onSave={onSave} onArchive={onArchive} onChangeActivity={onChangeActivity} />}
                {activeTab === tabs.roster && <MobileRoster activity={activity} roster={roster} backupRoster={backupRoster} maxPlayers={maxPlayers} saveEnabled={saveEnabled} onRosterChange={onUpdateRoster} onBackupRosterChange={onUpdateBackups} />}
            </div>
        </div >
    )
}