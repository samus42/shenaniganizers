import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './home/Home'
import ApplicationBar from './ApplicationBar'
import ProcessLogin from './user/ProcessLogin'
import Profile from './user/Profile'
import CalendarInstructions from './home/CalendarInstructions'
import DiscipleSymbols from './tools/disciple/DiscipleSymbols'
import ExternalHome from './external/ExternalHome'
import DisciplePuzzle from './tools/disciple/DisciplePuzzle'
import TakenKingChestPuzzle from './tools/takenking/ChestPuzzle'
import {BlogMain} from './blog'
import {ManageEmoteConfigs} from './tools/emotes/ManageEmoteConfigs'
import {EventMain} from './events/EventMain.jsx'

const Main = () => {
    return (
        <Router>
            <ApplicationBar />
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path=":tab" element={<Home />} />
                </Route>
                <Route exact path="/help/calendar" element={<CalendarInstructions />} />
                <Route exact path="/event/:activityKey" element={<EventMain />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/process-login" element={<ProcessLogin />} />
                <Route path="/tools/disciple" element={<DiscipleSymbols />}>
                    <Route path=":filter" element={<DiscipleSymbols />} />
                </Route>
                <Route path="/tools/disciple-puzzle" element={<DisciplePuzzle />} />
                <Route path="/tools/tkk-puzzle" element={<TakenKingChestPuzzle />} />
                <Route path="/blog" element={<BlogMain />} />
                <Route exact path="/public/" element={<ExternalHome />} />
                <Route exact path="/public/tools/disciple" element={<DiscipleSymbols />}>
                    <Route path=":filter" element={<DiscipleSymbols />} />
                </Route>
                <Route path="/public/tools/disciple-puzzle" element={<DisciplePuzzle />} />
                <Route path="/public/tools/tkk-puzzle" element={<TakenKingChestPuzzle />} />
                <Route path="/tools/emotes/:configId" element={<ManageEmoteConfigs />} />
                <Route path="/tools/emotes" element={<ManageEmoteConfigs />} />
            </Routes>
        </Router>
    )
}

export default Main
