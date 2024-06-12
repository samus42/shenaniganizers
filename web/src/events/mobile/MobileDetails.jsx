import React, { useMemo } from 'react'
import debounce from 'lodash.debounce'
import { TextField, Button, Slider, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { SelectActivityDialogButton } from '../SelectActivity';

const MobileDetails = ({ instanceName, date, maxPlayers, saveEnabled, activity, onChange = () => { }, onSave = () => { }, onArchive = () => { }, onChangeActivity = () => { } }) => {
    const debouncedSave = useMemo(() => debounce(onSave, 300), [onSave])
    console.log('activity: ', activity)
    return (
        <div>
            <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}><Button variant="contained" disabled={!saveEnabled} onClick={debouncedSave}>Save Changes</Button></div>

            <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h5">{activity.title}</Typography>
                <SelectActivityDialogButton buttonText='Change' onSelect={(act) => { onChangeActivity(act) }} onCancel={() => { }} />
            </div>
            <div style={{ paddingTop: '50px' }}>
                <TextField fullWidth label="Create a name for this activity!" value={instanceName} onChange={(evt) => onChange({ instanceName: evt.target.value, date, maxPlayers })} />
            </div>
            <div style={{ paddingTop: '50px' }}>
                <div>What time do you want to go?</div>
                <DateTimePicker
                    onChange={(val) => onChange({ instanceName, date: val, maxPlayers })}
                    value={date}
                    minutesStep={5}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </div>
            {activity?.options?.canSetMaxPlayers && (
                <div style={{ paddingTop: '20px' }}>
                    <label style={{ paddingRight: '10px' }}>How many players? <strong style={{ paddingLeft: '10px' }}>{maxPlayers}</strong></label>
                    <Slider marks value={maxPlayers} min={1} max={10} step={1} onChange={(evt, newValue) => onChange({ instanceName, date, maxPlayers: newValue })}></Slider>
                </div>
            )}
            {!saveEnabled && (
                <div style={{ marginTop: '30px' }}><strong>You must enter a name and date before saving.</strong></div>
            )}
            {activity.id && <div style={{ marginTop: '80px' }}>
                <Button onClick={onArchive} variant="contained">Archive Activity To Remove From Active List</Button>
            </div>
            }
        </div>
    )
}

export default MobileDetails