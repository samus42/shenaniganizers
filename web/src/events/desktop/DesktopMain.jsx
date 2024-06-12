import React, { useMemo } from 'react'
import debounce from 'lodash.debounce'
import { Grid, Button, Typography, TextField, Slider, Stack } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DesktopRoster from './DesktopRoster'
import { SelectActivityDialogButton } from '../SelectActivity';

export function DesktopMain({ roster, backupRoster, date, instanceName, maxPlayers, activity, saveEnabled, onSave, onArchive, onChangeActivity, onDetailsChange, onRosterChange, onBackupRosterChange }) {
    const debouncedSave = useMemo(() => debounce(onSave, 300), [onSave])
    return (
        <div style={{ paddingLeft: '20px' }}>
            <Stack direction="row" spacing={2} style={{ paddingTop: '50px', width: '100%' }}>
                <Typography variant="h5">{activity.title}</Typography>
                <SelectActivityDialogButton buttonText='Change' onSelect={(act) => { onChangeActivity(act) }} onCancel={() => { }} />
            </Stack>
            <div style={{ paddingLeft: '0px', paddingTop: '20px', paddingBottom: '10px' }}>
                <Typography variant="h4">{activity.activityName}</Typography>
            </div>
            {!activity.active && <h2 style={{ paddingLeft: '20px' }}>This activity is longer active!</h2>}
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <div>
                        <Typography variant="h6">Details</Typography>
                    </div>
                    <div>
                        <TextField fullWidth label="Create a name for this activity!" value={instanceName} onChange={(evt) => onDetailsChange({ instanceName: evt.target.value, date, maxPlayers })} />
                    </div>
                    <div style={{ paddingTop: '10px' }}>
                        <label style={{ paddingRight: '10px' }}>What time do you want to go?</label>
                        <DateTimePicker
                            onChange={(val) => onDetailsChange({ instanceName, date: val, maxPlayers })}
                            value={date}
                            minutesStep={5}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    {activity?.options?.canSetMaxPlayers && (
                        <div style={{ paddingTop: '20px' }}>
                            <label style={{ paddingRight: '10px' }}>How many players? <strong style={{ paddingLeft: '10px' }}>{maxPlayers}</strong></label>
                            <Slider value={maxPlayers} min={1} max={activity?.maxPlayers || 10} step={1} marks onChange={(evt, newValue) => onDetailsChange({ instanceName, date, maxPlayers: newValue })}></Slider>
                        </div>
                    )}
                    <div style={{ paddingTop: '30px' }}>
                        <Button fullWidth variant="contained" disabled={!saveEnabled} onClick={debouncedSave}>Save Changes</Button>
                    </div>
                    {activity.id && <div style={{ marginTop: '50px' }}>
                        <Button onClick={onArchive} variant="contained">Archive Activity To Remove From Active List</Button>
                    </div>
                    }
                </Grid>
                <Grid item xs={8}>
                    <div>
                        <Typography variant="h6">Roster</Typography>
                    </div>
                    <DesktopRoster roster={roster} backupRoster={backupRoster} onRosterChange={onRosterChange} onBackupRosterChange={onBackupRosterChange} activity={activity} maxPlayers={maxPlayers} />
                </Grid>
            </Grid>
        </div>
    )
}

export default DesktopMain
