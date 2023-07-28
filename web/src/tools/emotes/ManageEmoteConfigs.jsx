import React, { useEffect, useState } from 'react'
import { ListEmoteConfigs } from './ListEmoteConfigs'
import { EmoteActions } from './EmoteActions'
import { useParams, useNavigate } from 'react-router-dom'
import { getCurrentUserInfo } from '../../user/currentUser'
import raidClient from '../../api/raidClient'
import { gql } from '@apollo/client'

export function ManageEmoteConfigs() {
    const params = useParams()
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        setCurrentUser(getCurrentUserInfo())
    }, [])

    const onSave = async (config) => {
        const mutation = gql`mutation ($config: EmoteConfigInput!) {
            config: saveEmoteConfig(emoteConfig: $config) {id}
        }`
        const { data } = await raidClient.mutate({ mutation, variables: { config } })
        onConfigSelect(data.config.id)
    }

    const onConfigSelect = (id) => {
        navigate(`/tools/emotes/${id}`)
    }
    if (params.configId) {
        return <EmoteActions currentUser={currentUser} configId={params.configId} onSave={onSave} onCancel={() => navigate('/tools/emotes')} />
    }
    return <ListEmoteConfigs currentUser={currentUser} onSelect={onConfigSelect} />
}