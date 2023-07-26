import allEmotes from './emotes.json'
import React, { useMemo, useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Autocomplete, TextField, Button, Typography, Select, MenuItem } from '@mui/material'

const directionOptions = ['Left', 'Up', 'Down', 'Right']

function EmoteSelect({ value, onChange, label = "Emote Name" }) {
    return <Autocomplete
        sx={{ padding: '10px' }}
        value={value}
        onChange={(evt, newValue) => onChange(newValue)}
        options={allEmotes}
        autoHighlight
        getOptionLabel={(opt) => opt.name}
        renderInput={(params) => <TextField {...params} label={label} />}
    />
}

function DirectionSelect({ value, onChange, label, upEmote, leftEmote, downEmote, rightEmote }) {
    // return <Autocomplete
    //     sx={{ padding: '10px' }}
    //     value={value}
    //     onChange={(evt, newValue) => onChange(newValue)}
    //     options={directionOptions}
    //     renderInput={(params) => <TextField {...params} label={label} />}
    // />
    return <Select value={value} label={label} onChange={(evt) => onChange(evt.target.value)}>
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="up">Up</MenuItem>
        <MenuItem value="right">Right</MenuItem>
        <MenuItem value="down">Down</MenuItem>
    </Select>
}
export function EmoteActions() {
    const [upEmote, setUpEmote] = useState(null)
    const [leftEmote, setLeftEmote] = useState(null)
    const [rightEmote, setRightEmote] = useState(null)
    const [downEmote, setDownEmote] = useState(null)
    const [yesDirection, setYesDirection] = useState(null)
    const [noDirection, setNoDirection] = useState(null)

    return (
        <div style={{ padding: '10px' }}>
            <Typography variant='h4'>Wendi Emote Guide</Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={12}>
                    <Typography variant='h6'>Choose your four emotes:</Typography>
                    <EmoteSelect label="DPad-Left" value={leftEmote} onChange={setLeftEmote} />
                    <EmoteSelect label="DPad-Up" value={upEmote} onChange={setUpEmote} />
                    <EmoteSelect label="DPad-Right" value={rightEmote} onChange={setRightEmote} />
                    <EmoteSelect label="DPad-Down" value={downEmote} onChange={setDownEmote} />
                </Grid>
                <Grid xs={4}>
                    <Typography variant='h6'>Basic</Typography>
                    <DirectionSelect label="Yes" value={yesDirection} onChange={setYesDirection} />
                    <DirectionSelect label="No" value={noDirection} onChange={setNoDirection} />
                </Grid>
            </Grid>

        </div>
    )
}