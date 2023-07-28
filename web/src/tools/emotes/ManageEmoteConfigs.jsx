import React, { useEffect, useState } from 'react'
import { ListEmoteConfigs } from './ListEmoteConfigs'
import { EmoteActions } from './EmoteActions'
import { useParams, useNavigate } from 'react-router-dom'
import { getCurrentUserInfo } from '../../user/currentUser'
import raidClient from '../../api/raidClient'
import { gql } from '@apollo/client'
import { IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export function ManageEmoteConfigs() {
    const params = useParams()
    const navigate = useNavigate()
    const [saveMessage, setSaveMessage] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        setCurrentUser(getCurrentUserInfo())
    }, [])

    const onSave = async (config) => {
        const mutation = gql`mutation ($config: EmoteConfigInput!) {
            config: saveEmoteConfig(emoteConfig: $config) {id}
        }`
        const { data } = await raidClient.mutate({ mutation, variables: { config } })
        setSaveMessage('Config data saved!')
        onConfigSelect(data.config.id)
    }

    const onConfigSelect = (id) => {
        navigate(`/tools/emotes/${id}`)
    }
    return (
        <>
            {params.configId ? <EmoteActions currentUser={currentUser} configId={params.configId} onSave={onSave} onCancel={() => navigate('/tools/emotes')} /> : <ListEmoteConfigs currentUser={currentUser} onSelect={onConfigSelect} />}

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
        </>
    )
}