import {useState} from 'react'
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineOppositeContent,
    TimelineDot,
    TimelineConnector,
    TimelineContent
} from '@mui/lab'
import {Link, Avatar, Typography, Popover, Card, CardContent, List, ListItem} from '@mui/material'

const ace = 'Aaron Corcoran'
const samus = 'Scott MacDonald'
const tansy = 'Tracy Smith-Van Pelt'
const samusIcon = 'https://www.bungie.net/img/profile/avatars/e2015_14.jpg'
const aceIcon = 'https://www.bungie.net//img/profile/avatars/avatar23.jpg'
const tansyIcon =
    'https://image.api.np.km.playstation.net/images/?format=png&w=160&h=160&image=https%3A%2F%2Fkfscdn.api.np.km.playstation.net%2F5387964934898443052%2F1541722837287.png&sign=1cc7d0286c4fc59c83ec1f0c6a37f2d414df1daa'

const dolArnach = {
    author: ace,
    icon: aceIcon,
    title: 'Into the Lair of Dôl Arnách',
    pdf: 'https://drive.google.com/file/d/1aRAdXjs53rym6sK1TX0QnqLbMOhccBOK/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/14oVvqN4yXzc7XzbztzsJbWumwChvAiIU/view?usp=sharing'
}
const thornInTwilight = {
    author: samus,
    icon: samusIcon,
    title: 'A Thorn In Twilight',
    pdf: 'https://drive.google.com/file/d/1IYXWvPoNCadS-PTuYfHjHayNVFKwSP8Y/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/1BjwOC80JfBmZVaoKJtgPpn8m5J1OeUOD/view?usp=sharing'
}
const halilysWar = {
    author: ace,
    icon: aceIcon,
    title: `Halily's War`,
    pdf: 'https://drive.google.com/file/d/1KHoI2UM9XrucOfadcGYgQA-VmRZaIJam/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/1NxuxoskUfQyGNrOMauO13GNuH_LaUmnU/view?usp=sharing'
}
const darkBalance = {
    author: samus,
    icon: samusIcon,
    title: 'A Dark Balance',
    pdf: 'https://drive.google.com/file/d/1gTzGi75dX5fK4Sr-p65teATbz4mpFuZ_/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/19b-YBJl4gYCMleH9VM-hqDuTEsk-qkD4/view?usp=sharing'
}
const loyaltysTest = {
    author: samus,
    icon: samusIcon,
    title: `Loyalty's Test`,
    pdf: 'https://drive.google.com/file/d/15HrrKAcA5Q-T3e1_gINCEQkdzkRC0Uj-/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/1zB1JFjuAJ3pXeI3JobDg9BySBUrTl7uH/view?usp=sharing'
}
const threadsOfDeceit = {
    author: samus,
    icon: samusIcon,
    title: `Threads of Deceit`,
    subtext: 'Just Released!',
    pdf: 'https://drive.google.com/file/d/19sGhUKTI-p8Pbg7tE2qZQasFYO1pZkUr/view?usp=drive_link',
    epub: 'https://drive.google.com/file/d/1pF8t61DJwN8_4UAdLx1PnyKJQoWdqeWR/view?usp=drive_link'
}
const thornOfDarkness = {
    author: samus,
    icon: samusIcon,
    title: `Thorn of Darkness`,
    subtext: 'Coming Fall 2025'
}
const redjackThief = {
    author: ace,
    icon: aceIcon,
    title: 'The Redjack Thief',
    pdf: 'https://drive.google.com/file/d/18fRu74TJTExGUI4KuevNN-OkAkOsp4IC/view?usp=sharing',
    epub: 'https://drive.google.com/file/d/1C98vmkwY-598Cm1OGHjrUpHkbsS7XoYP/view?usp=sharing'
}
const sinsOfTheKeepers = {
    author: ace,
    icon: aceIcon,
    title: 'Sins of the Keepers',
    subtext: 'Just Released!',
    pdf: 'https://drive.google.com/file/d/1EDM8uXQJZwobyVhlv5lMJ5aLFhtizPfS/view?usp=drive_link'
}
const worstHunter = {
    author: tansy,
    icon: tansyIcon,
    title: 'The Worst Hunter',
    pdf: 'https://drive.google.com/file/d/12svAXAL4Y8UccfMK1iNVrfgqJxpHFaTQ/view?usp=share_link'
}
const defectiveTitan = {
    author: tansy,
    icon: tansyIcon,
    title: 'The Defective Titan',
    pdf: 'https://drive.google.com/file/d/1yWN5b4Rn5ztTiNF6CotOfVa8rAuiBpF_/view?usp=sharing'
}
function BookItem({book, onClick}) {
    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <small>{book.subtext || ''}</small>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot sx={{padding: 0}}>
                    <Avatar src={book.icon} sx={{width: 36, height: 36}} />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                {book.pdf ? (
                    <Typography variant="h6">
                        <Link className="book-link" onClick={(evt) => onClick(evt, book)}>
                            {book.title}
                        </Link>
                    </Typography>
                ) : (
                    <Typography variant="h6">{book.title}</Typography>
                )}
                <Typography>{book.author}</Typography>
            </TimelineContent>
        </TimelineItem>
    )
}

function EventItem({event, subtext}) {
    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="h6">{event}</Typography>
                <small>{subtext}</small>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{/* <Typography variant="h6">Event</Typography> */}</TimelineContent>
        </TimelineItem>
    )
}

function BookDetails({book}) {
    if (!book) {
        return null
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="h6">Download Options</Typography>
                <List>
                    <ListItem>
                        <a href={book.pdf} target="_blank" rel="noreferrer">
                            PDF
                        </a>
                    </ListItem>
                    {book.epub && (
                        <ListItem>
                            <a href={book.epub} target="_blank" rel="noreferrer">
                                ePub (for all eReaders, including Kindle)
                            </a>
                        </ListItem>
                    )}
                </List>
                <Typography variant="h6">If you want a print copy, just ask!</Typography>
            </CardContent>
        </Card>
    )
}
export default function Books() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [selected, setSelected] = useState(null)
    const onBookClick = (evt, book) => {
        setAnchorEl(evt.currentTarget)
        setSelected(book)
    }
    const handlePopoverClose = () => {
        setAnchorEl(null)
        setSelected(null)
    }
    return (
        <div>
            <Typography variant="h6">
                Our clan members have written a few Destiny novels using a shared universe. Give
                them a try! See the timeline below for reading order. Click on a book link to get
                download options.
            </Typography>
            <Typography variant="h6">
                {`If you'd like to get in touch with our authors, drop us an email at `}
                <a href="mailto:books@shenaniganizers.com">books@shenaniganizers.com</a>
                <strong>{`. Note: the email address is not currently working. `}</strong>
                {`The domain move to Squarespace somehow screwed that up.`}
            </Typography>
            <Timeline>
                <EventItem event={`Crota's End`} />
                <EventItem event={`Fall of Oryx`} />
                <BookItem book={dolArnach} onClick={onBookClick} />
                <BookItem book={thornInTwilight} onClick={onBookClick} />
                <EventItem event="The Red War" />
                <BookItem book={halilysWar} onClick={onBookClick} />
                <BookItem book={darkBalance} onClick={onBookClick} />
                <BookItem book={worstHunter} onClick={onBookClick} />
                <EventItem event="Forsaken" />
                <BookItem book={loyaltysTest} onClick={onBookClick} />
                <BookItem book={defectiveTitan} onClick={onBookClick} />
                <BookItem book={redjackThief} onClick={onBookClick} />
                <BookItem book={sinsOfTheKeepers} onClick={onBookClick} />
                <BookItem book={threadsOfDeceit} onClick={onBookClick} />
                <BookItem book={thornOfDarkness} />
                <EventItem event="Shadowkeep" />
            </Timeline>
            <Popover
                open={anchorEl}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <BookDetails book={selected} />
            </Popover>
        </div>
    )
}
