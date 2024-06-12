import React, { useState, useEffect } from 'react'
import { getActivities, getGames } from './activityTemplates'
import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent, Button, Dialog, DialogContent, Select, FormControl, InputLabel, MenuItem, Divider } from '@mui/material'
import _ from 'lodash'

function ActivityCard({ activity, onClick }) {
    return (
        <Card>
            <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start' }} onClick={() => onClick(activity)}>
                <CardMedia sx={{ width: '80px' }} component="img" image={activity.imagePath}></CardMedia>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5">{activity.title}</Typography>
                    <Typography variant="subtitle1">{`${activity.game} - ${activity.type}`}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export function SelectActivity({ onSelect, onCancel }) {
    const [activities, setActivities] = useState([])
    const [filteredActivities, setFilteredActivities] = useState([])
    const [gameFilter, setGameFilter] = useState('All')
    useEffect(() => {
        const data = getActivities()
        setActivities(data)
    }, [])

    useEffect(() => {
        let newList = activities
        if (gameFilter !== 'All') {
            newList = activities.filter(({ game }) => game === gameFilter)
        }
        setFilteredActivities(_.sortBy(newList, 'title'))
    }, [activities, gameFilter])

    return (
        <div>
            <div>
                <Button fullWidth variant="contained" onClick={onCancel}>Go Back</Button>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex' }}>
                <FormControl fullWidth>
                    <InputLabel id="game-select-label">Game</InputLabel>
                    <Select labelId="game-select-label" label="Game" value={gameFilter} onChange={(evt) => setGameFilter(evt.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        {getGames().map((game) => (
                            <MenuItem key={game} value={game}>{game}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Grid container spacing={2}>
                {filteredActivities.map((activity) => (
                    <Grid xs={12} md={6} item key={activity.title}>
                        <ActivityCard activity={activity} onClick={onSelect} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export function SelectActivityDialogButton({ onSelect, onCancel, buttonText = "Select Activity", buttonVariant = "outlined" }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button variant={buttonVariant} onClick={() => setOpen(true)}>{buttonText}</Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
                <DialogContent>
                    <SelectActivity
                        onSelect={(activity) => {
                            onSelect(activity)
                            setOpen(false)
                        }}
                        onCancel={() => {
                            onCancel()
                            setOpen(false)
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}