import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import isEmpty from 'lodash.isempty'
import raidClient from '../../api/raidClient'
import { Button, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

const query = gql`query {
    configs: listEmoteConfigs {
        id
        player {
            name
            destinyId
            iconPath
        }
    }
}`

export function ListEmoteConfigs({ onSelect, currentUser }) {
    const [configs, setConfigs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const loadConfigs = async () => {
            setIsLoading(true)
            const { data } = await raidClient.query({ query, fetchPolicy: 'network-only' })
            setConfigs(data.configs)
            setIsLoading(false)
        }
        loadConfigs()
    }, [])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    let addDisabledMessage = ''
    if (!currentUser) {
        addDisabledMessage = 'You must be logged in to create a Emote Config.'
    } else if (configs.find((config) => config.player.name === currentUser.name)) {
        addDisabledMessage = 'You have already created a config, select it below to edit.'
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2">Emote Configurations</Typography>
            <div>
                <Button variant="contained" disabled={!isEmpty(addDisabledMessage)} onClick={() => onSelect('new')}>Create New</Button>
                {!isEmpty(addDisabledMessage) && <Typography variant="body1">{addDisabledMessage}</Typography>}
            </div>
            <List>
                {configs.map((config) => (
                    <ListItemButton key={config.id} onClick={() => onSelect(config.id)}>
                        <ListItemIcon>
                            <img src={config.player.iconPath} alt="" width="24" height="24" />
                        </ListItemIcon>
                        <ListItemText primary={config.player.name} />
                    </ListItemButton>
                ))}
            </List>
        </div>
    )
}