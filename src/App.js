import './index.css'
import routes from './routes.json'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { ObservedAuthentication } from "./components/pages/Authentication";
import { ObservedContact } from "./components/pages/Contact";
import About from "./components/pages/About";
import Chat from './components/pages/Chat';
import { sessionStore } from './stores/SessionStore';
import ChatRoomStore from './stores/ChatRoomStore';
import ChatRoomRepository from './repositories/ChatRoomRepository';
import ChatRoomFirebase from './repositories/ChatRoomFirebase';
import { db } from './firebase';

function App() {

    const chatRoomFirebase = new ChatRoomFirebase(db);
    const chatRoomRepository = new ChatRoomRepository({ chatRoomSource: chatRoomFirebase });

    return (
        <Router>
            <Routes>
                <Route exact path={routes.Home} element={<Home />} />
                <Route exact path={routes.Authentication} element={<ObservedAuthentication />} />
                <Route exact path={routes.Contact} element={<ObservedContact />} />
                <Route exact path={routes.About} element={<About />} />
                <Route exat path={routes.Chat} element={<Chat chatRoomStore={new ChatRoomStore({ repository: chatRoomRepository, sessionStore: sessionStore })} />} />
            </Routes>
        </Router>
    )
}

export default App;