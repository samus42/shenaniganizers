import {useEffect, useState} from 'react'
import {differenceBy, isEmpty} from 'lodash'
import {getClanRoster} from '../../api/destiny'
import {
    TextField,
    Button,
    List,
    ListItem,
    IconButton,
    Autocomplete,
    Grid,
    Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/PersonRemove'
import {v4 as uuid} from 'uuid'
import {getCurrentUserInfo} from '../../user/currentUser'

const normalizeId = (destinyPlayer) => {
    return {name: destinyPlayer.name, id: destinyPlayer.destinyId, type: 'destiny'}
}

function PlayerList({title, players, onDelete}) {
    return (
        <>
            <div style={{paddingLeft: '10px'}}>
                <strong>{title}</strong>
            </div>
            {isEmpty(players) ? (
                <Typography sx={{paddingLeft: '10px', fontStyle: 'italic'}}>
                    No Players Selected
                </Typography>
            ) : (
                <List>
                    {players.map((player) => (
                        <ListItem
                            span={4}
                            key={player.name}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => onDelete(player)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <span>{player.name}</span>
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    )
}
const DesktopRoster = ({
    roster = [],
    backupRoster = [],
    excludeList,
    onRosterChange,
    onBackupRosterChange,
    maxPlayers
}) => {
    const [destinyRoster, setDestinyRoster] = useState([])
    const [filteredRoster, setFilteredRoster] = useState([])
    const [manualPlayerName, setManualPlayerName] = useState('')
    const [selectedDestinyPlayer, setSelectedDestinyPlayer] = useState(null)

    useEffect(() => {
        const user = getCurrentUserInfo()

        if (!!user && isEmpty(manualPlayerName)) {
            const found = filteredRoster.find(({id}) => id === user.destinyId)
            if (!!found && isEmpty(selectedDestinyPlayer)) {
                setSelectedDestinyPlayer(found)
            } else if (
                !found &&
                selectedDestinyPlayer &&
                selectedDestinyPlayer.id === user.destinyId
            ) {
                setSelectedDestinyPlayer(null)
            }
        }
    }, [filteredRoster, manualPlayerName, selectedDestinyPlayer])

    useEffect(() => {
        const loadDestinyRoster = async () => {
            const results = await getClanRoster()
            const normalized = results.map(normalizeId)
            setDestinyRoster(normalized)
            const filtered = differenceBy(results.map(normalizeId), roster, 'id')
            setFilteredRoster(filtered)
        }
        loadDestinyRoster().catch(console.error)
    }, [excludeList, roster])

    useEffect(() => {
        const activeFiltered = differenceBy(destinyRoster, roster, 'id')
        const allFiltered = differenceBy(activeFiltered, backupRoster, 'id')
        setFilteredRoster(allFiltered)
    }, [roster, destinyRoster, backupRoster])

    const onSelectDestinyPlayer = (evt, player) => {
        setSelectedDestinyPlayer(player)
        setManualPlayerName('')
    }

    const onManualPlayerChange = (evt) => {
        setManualPlayerName(evt.target.value)
    }

    const onAddPlayer = () => {
        if (!isEmpty(manualPlayerName)) {
            onRosterChange(roster.concat({id: uuid(), type: 'manual', name: manualPlayerName}))
        } else if (selectedDestinyPlayer) {
            onRosterChange(roster.concat(selectedDestinyPlayer))
        }
        setSelectedDestinyPlayer(null)
        setManualPlayerName('')
    }

    const onAddBackup = () => {
        if (!isEmpty(manualPlayerName)) {
            onBackupRosterChange(
                backupRoster.concat({id: uuid(), type: 'manual', name: manualPlayerName})
            )
        } else if (selectedDestinyPlayer) {
            onBackupRosterChange(backupRoster.concat(selectedDestinyPlayer))
        }
        setSelectedDestinyPlayer(null)
        setManualPlayerName('')
    }

    const onRemovePlayer = (player) => {
        onRosterChange(roster.filter(({id}) => id !== player.id))
    }
    const onRemoveBackup = (player) => {
        onBackupRosterChange(backupRoster.filter(({id}) => id !== player.id))
    }

    const atLimit = () => maxPlayers - roster.length <= 0

    return (
        <div style={{maxWidth: '500px'}}>
            <div>
                <Autocomplete
                    disabled={atLimit()}
                    placeholder="Select Destiny Player"
                    value={selectedDestinyPlayer}
                    getOptionLabel={(o) => o.name}
                    isOptionEqualToValue={(o, val) => o.id === val.id}
                    options={filteredRoster}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Destiny Player" />
                    )}
                    onChange={onSelectDestinyPlayer}
                />
            </div>
            <div style={{padding: '20px'}}>
                <strong>OR</strong>
            </div>
            <div>
                <TextField
                    disabled={!!selectedDestinyPlayer}
                    fullWidth
                    label="Enter player name"
                    value={manualPlayerName}
                    onChange={onManualPlayerChange}
                />
            </div>
            <div style={{paddingTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant="contained"
                    disabled={(isEmpty(manualPlayerName) && !selectedDestinyPlayer) || atLimit()}
                    onClick={onAddPlayer}
                >
                    Add Active
                </Button>
                <Button
                    variant="outlined"
                    disabled={isEmpty(manualPlayerName) && !selectedDestinyPlayer}
                    onClick={onAddBackup}
                >
                    Add Backup
                </Button>
            </div>
            <Grid sx={{marginTop: '10px'}} container spacing={2}>
                <Grid size={{xs:12, md:6}}>
                    <PlayerList
                        title={`${Math.max(0, maxPlayers - roster.length)} active slots available`}
                        players={roster}
                        onDelete={onRemovePlayer}
                    />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                    <PlayerList title="Backups" players={backupRoster} onDelete={onRemoveBackup} />
                </Grid>
            </Grid>
        </div>
    )
}

export default DesktopRoster
