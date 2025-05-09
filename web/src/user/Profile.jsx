import gql from 'graphql-tag'
import capitalize from 'capitalize'
import {useState, useEffect} from 'react'
import {getCurrentUserInfo} from './currentUser'
import raidClient from '../api/raidClient'
import calculateMetrics from './calculateMetrics'
import {determineRank, hasRanks} from './ranks'
import {Typography, Grid} from '@mui/material'

const query = gql`
    query ($destinyId: String!) {
        history: userRaidHistory(destinyId: $destinyId) {
            id
            raidName
            instanceName
            date
            stages {
                title
                description
                roles {
                    name
                    type
                    player {
                        destinyId
                    }
                }
            }
        }
    }
`

const RoleDetail = ({raidName, roleType, count}) => {
    const {rank, nextAt} = determineRank(raidName, roleType, count)
    return (
        <div style={{marginBottom: '10px'}}>
            <div style={{textDecoration: 'underline'}}>
                <strong>{capitalize(roleType)}</strong>
            </div>
            <div style={{}}>
                <div>{`Times Been: ${count}`}</div>
                {hasRanks(raidName) && (
                    <>
                        <div>{`Rank: ${rank}`}</div>
                        <div>{`Next Rank At: ${nextAt}`}</div>
                    </>
                )}
            </div>
        </div>
    )
}
const RaidDetails = ({raidInfo}) => {
    const {raidName, numRuns, roleTypes} = raidInfo
    return (
        <Grid>
            <Typography variant="h4">
                {raidName}
                <small>{`  (${numRuns} runs)`}</small>
            </Typography>
            <div>
                <Typography variant="h6">Roles:</Typography>
                <div style={{marginLeft: '20px'}}>
                    {Object.keys(roleTypes).map((roleType) => {
                        return (
                            <RoleDetail
                                key={`${raidName}_${roleType}`}
                                raidName={raidName}
                                roleType={roleType}
                                count={roleTypes[roleType]}
                            />
                        )
                    })}
                </div>
            </div>
        </Grid>
    )
}
const Profile = () => {
    const [currentUser] = useState(getCurrentUserInfo())
    const [raidMetrics, setRaidMetrics] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getRaidInfo = async () => {
            const {data} = await raidClient.query({
                query,
                variables: {destinyId: currentUser.destinyId}
            })
            const metrics = calculateMetrics(currentUser.destinyId, data.history)
            setRaidMetrics(metrics)
            setLoading(false)
        }
        setLoading(true)
        getRaidInfo()
    }, [currentUser.destinyId])

    if (loading) {
        return (
            <div style={{padding: '10px'}}>
                <Typography variant="h4">Loading...</Typography>
            </div>
        )
    }
    return (
        <div style={{padding: '10px'}}>
            <Typography variant="h2">
                <img
                    alt="profile icon"
                    src={currentUser.iconPath}
                    style={{width: '48px', marginRight: '10px'}}
                />
                {currentUser.name}
            </Typography>
            <Grid container spacing={6}>
                {raidMetrics.map((raidInfo) => (
                    <RaidDetails raidInfo={raidInfo} key={raidInfo.raidName} />
                ))}
            </Grid>
        </div>
    )
}

export default Profile
