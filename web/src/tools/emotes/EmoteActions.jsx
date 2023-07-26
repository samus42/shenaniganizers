import allEmotes from './emotes.json'
import differenceBy from 'lodash.differenceby'
import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Autocomplete, Box, TextField, FormControl, Typography, Select, MenuItem, InputLabel } from '@mui/material'

function EmoteSelect({ value, onChange, label = "Emote Name", selected = [] }) {
    return <div style={{ display: 'flex' }}>
        <Autocomplete
            sx={{ padding: '10px', width: '90%' }}
            value={value}
            onChange={(evt, newValue) => onChange(newValue)}
            options={differenceBy(allEmotes, selected, 'name')}
            autoHighlight
            getOptionLabel={(opt) => opt.name}
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        height="20"
                        src={`https://www.bungie.net/${option.icon}`}
                        srcSet={`https://www.bungie.net/${option.icon}`}
                        alt=""
                    />
                    {option.name}
                </Box>
            )}
        />
    </div>
}

function DirectionSelect({ value, onChange, label, upEmote, leftEmote, downEmote, rightEmote, selected }) {
    const labelId = `ds-${label}`
    const showOption = (dir) => !selected.includes(dir) || value === dir
    return <div style={{ marginTop: '10px' }}>
        <FormControl fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select labelId={labelId} sx={{ padding: '10px' }} value={value} label={label} onChange={(evt) => onChange(evt.target.value)}>
                {showOption('left') && <MenuItem value="left">
                    Left ({`${leftEmote?.name || 'unassigned'}`})
                </MenuItem>}
                {showOption('up') && <MenuItem value="up">Up ({`${upEmote?.name || 'unassigned'}`})</MenuItem>}
                {showOption('right') && <MenuItem value="right">Right ({`${rightEmote?.name || 'unassigned'}`})</MenuItem>}
                {showOption('down') && <MenuItem value="down">Down ({`${downEmote?.name || 'unassigned'}`})</MenuItem>}
            </Select>
        </FormControl>
    </div>
}
export function EmoteActions() {
    const [upEmote, setUpEmote] = useState(null)
    const [leftEmote, setLeftEmote] = useState(null)
    const [rightEmote, setRightEmote] = useState(null)
    const [downEmote, setDownEmote] = useState(null)
    const [yesDirection, setYesDirection] = useState('')
    const [noDirection, setNoDirection] = useState('')
    const [oneDirection, setOneDirection] = useState('')
    const [twoDirection, setTwoDirection] = useState('')
    const [threeDirection, setThreeDirection] = useState('')
    const [fourDirection, setFourDirection] = useState('')
    const selected = [upEmote, leftEmote, downEmote, rightEmote].filter((i) => i)
    const basicSelected = [yesDirection, noDirection]
    const countSelected = [oneDirection, twoDirection, threeDirection, fourDirection]
    return (
        <div style={{ padding: '10px' }}>
            <Typography variant='h4'>Wendi Emote Guide</Typography>
            <Grid container spacing={2}>
                <Grid md={12} xs={12}>
                    <div>
                        <strong>Assign emotes to D-Pad buttons</strong>
                    </div>
                </Grid>
                <Grid md={4} xs={0} />
                <Grid md={4} xs={12}>
                    <EmoteSelect label="Up, Front" value={upEmote} onChange={setUpEmote} selected={selected} />
                </Grid>
                <Grid md={4} xs={0} />
                <Grid md={4} xs={12}><EmoteSelect label="Left" value={leftEmote} onChange={setLeftEmote} selected={selected} /></Grid>
                <Grid md={4} xs={0} />
                <Grid md={4} xs={12}><EmoteSelect label="Right" value={rightEmote} onChange={setRightEmote} selected={selected} /></Grid>
                <Grid md={4} xs={0} />
                <Grid md={4} xs={12}>
                    <EmoteSelect label="Down, Back" value={downEmote} onChange={setDownEmote} selected={selected} />
                </Grid>
                <Grid md={4} xs={0} />
            </Grid>
            <hr />
            <Grid container spacing={2}>
                <Grid xs={12} md={5}>
                    <Typography variant='h6'>Basic</Typography>
                    <DirectionSelect label="Yes, Ready, Go" value={yesDirection} onChange={setYesDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={basicSelected} />
                    <DirectionSelect label="No, Wait, Stop" value={noDirection} onChange={setNoDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={basicSelected} />
                </Grid>
                <Grid xs={12} md={5}>
                    <Typography variant='h6'>Counting</Typography>
                    <DirectionSelect label="1" value={oneDirection} onChange={setOneDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={countSelected} />
                    <DirectionSelect label="2" value={twoDirection} onChange={setTwoDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={countSelected} />
                    <DirectionSelect label="3" value={threeDirection} onChange={setThreeDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={countSelected} />
                    <DirectionSelect label="4" value={fourDirection} onChange={setFourDirection} leftEmote={leftEmote} rightEmote={rightEmote} downEmote={downEmote} upEmote={upEmote} selected={countSelected} />
                </Grid>
            </Grid>
        </div>
    )
}