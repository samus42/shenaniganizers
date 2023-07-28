import allEmotes from './emotes.json'
import differenceBy from 'lodash.differenceby'
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash.isempty'
import Grid from '@mui/material/Unstable_Grid2'
import { Autocomplete, Box, TextField, FormControl, Typography, Select, MenuItem, InputLabel, Button } from '@mui/material'
import { gql } from '@apollo/client'
import raidClient from '../../api/raidClient'

function findEmote(name) {
    return allEmotes.find((emote) => emote.name === name)
}

function EmoteDisplay({ value, label }) {
    if (!value) {
        return <></>
    }
    return <Box component="div" sx={{ '& > img': { mr: 2, flexShrink: 0 }, marginBottom: '20px' }}>
        <div style={{ marginBottom: '5px' }}><strong>{label}</strong></div>
        <img
            loading="lazy"
            width="30"
            height="30"
            src={`https://www.bungie.net/${value.icon}`}
            srcSet={`https://www.bungie.net/${value.icon}`}
            alt=""
        />
        {value.name}
    </Box>
}
function EmoteSelect({ value, onChange, label = "Emote Name", selected = [], disabled }) {
    return <div style={{ display: 'flex' }}>
        <Autocomplete
            disabled={disabled}
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



export function EmoteActions({ currentUser, onSave, onCancel, configId }) {
    const [loadedConfig, setLoadedConfig] = useState(null)
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
    const [canWrite, setCanWrite] = useState(false)

    const selected = [upEmote, leftEmote, downEmote, rightEmote].filter((i) => i)
    const basicSelected = [yesDirection, noDirection]
    const countSelected = [oneDirection, twoDirection, threeDirection, fourDirection]
    useEffect(() => {
        if (configId !== 'new') {
            const loadConfig = async () => {
                const query = gql`query($configId: String!) {
                    config: getEmoteConfig(id: $configId) {
                        id
                        player {
                            name
                            iconPath
                            destinyId
                        }
                        upEmote
                        downEmote
                        leftEmote
                        rightEmote
                        yes
                        no
                        one
                        two
                        three
                        four
                    }
                }`
                const { data } = await raidClient.query({ query, variables: { configId }, fetchPolicy: 'network-only' })
                setLoadedConfig(data.config)
                if (currentUser && currentUser.destinyId === data.config.player.destinyId) {
                    setCanWrite(true)
                }
            }
            loadConfig()
        } else {
            setCanWrite(true)
        }
    }, [configId, currentUser])
    useEffect(() => {
        if (loadedConfig) {
            setUpEmote(findEmote(loadedConfig.upEmote))
            setDownEmote(findEmote(loadedConfig.downEmote))
            setLeftEmote(findEmote(loadedConfig.leftEmote))
            setRightEmote(findEmote(loadedConfig.rightEmote))
            setYesDirection(loadedConfig.yes)
            setNoDirection(loadedConfig.no)
            setOneDirection(loadedConfig.one)
            setTwoDirection(loadedConfig.two)
            setThreeDirection(loadedConfig.three)
            setFourDirection(loadedConfig.four)
        }
    }, [loadedConfig])

    const collectData = () => {
        return {
            id: configId === 'new' ? undefined : configId,
            player: currentUser,
            upEmote: upEmote.name,
            downEmote: downEmote.name,
            leftEmote: leftEmote.name,
            rightEmote: rightEmote.name,
            yes: yesDirection,
            no: noDirection,
            one: oneDirection,
            two: twoDirection,
            three: threeDirection,
            four: fourDirection
        }
    }

    const canSave = () => {
        return isEmpty([upEmote, downEmote, leftEmote, rightEmote, yesDirection, noDirection, oneDirection, twoDirection, threeDirection, fourDirection].filter(isEmpty))
    }
    const playerName = loadedConfig ? loadedConfig.player.name : currentUser?.name

    const getEmoteByDirection = (dir) => {
        if (dir === 'left') {
            return leftEmote
        } else if (dir === 'right') {
            return rightEmote
        } else if (dir === 'down') {
            return downEmote
        }
        return upEmote
    }
    const showReadOnly = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid md={4} xs={0} />
                    <Grid md={4} xs={12}>
                        <EmoteDisplay label="Up, Front" value={upEmote} />
                    </Grid>
                    <Grid md={4} xs={0} />
                    <Grid md={4} xs={12}><EmoteDisplay label="Left" value={leftEmote} /></Grid>
                    <Grid md={4} xs={0} />
                    <Grid md={4} xs={12}><EmoteDisplay label="Right" value={rightEmote} /></Grid>
                    <Grid md={4} xs={0} />
                    <Grid md={4} xs={12}>
                        <EmoteDisplay label="Down, Back" value={downEmote} />
                    </Grid>
                    <Grid md={4} xs={0} />
                </Grid>
                <hr />
                <Grid container spacing={2}>
                    <Grid xs={12} md={5}>
                        <Typography variant='h6'>Basic</Typography>
                        <EmoteDisplay label="Yes, Ready, Go" value={getEmoteByDirection(yesDirection)} />
                        <EmoteDisplay label="No, Wait, Stop" value={getEmoteByDirection(noDirection)} />
                    </Grid>
                    <Grid xs={12} md={5}>
                        <Typography variant='h6'>Counting</Typography>
                        <EmoteDisplay label="1" value={getEmoteByDirection(oneDirection)} />
                        <EmoteDisplay label="2" value={getEmoteByDirection(twoDirection)} />
                        <EmoteDisplay label="3" value={getEmoteByDirection(threeDirection)} />
                        <EmoteDisplay label="4" value={getEmoteByDirection(fourDirection)} />
                    </Grid>
                </Grid>
            </>)
    }

    const showWritable = () => {
        return (
            <>
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
            </>
        )
    }
    return (
        <div style={{ padding: '10px' }}>
            <Typography variant='h4'>{`${playerName} Emote Config`}</Typography>
            <div style={{ marginBottom: '10px' }}>
                {canWrite &&
                    <Button variant='contained' disabled={!canSave()} onClick={() => onSave(collectData())}>Save Config</Button>
                }
                <Button sx={{ marginLeft: '20px' }} variant='contained' onClick={onCancel}>{canWrite ? 'Cancel' : 'Go Back'}</Button>
            </div>
            {canWrite ? showWritable() : showReadOnly()}

        </div>
    )
}