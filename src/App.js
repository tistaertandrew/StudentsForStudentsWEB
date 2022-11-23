import './style/index.css'
import routes from './routes.json'
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {ObservedAuthentication} from "./components/pages/Authentication";
import {ObservedContact} from "./components/pages/Contact";
import {ChatObserver} from './components/pages/Chat';
import {sessionStore} from './stores/SessionStore';
import {ObserverFiles} from './components/pages/Files';
import {ObservedCalendar} from "./components/pages/Calendar";
import {ObservedRequests} from "./components/pages/Requests";

function App() {


    const AuthenticatedRoute = ({children}) => {
        if (!sessionStore.user) {
            // This way we could give to authentication a callback to redirect to the page the user wanted to access
            return <Navigate to={routes.Authentication}/>
        } else {
            return children
        }
    }

    return (
        <Router>
            <Routes>
                <Route exact path={routes.Home} element={<Home/>}/>
                <Route exact path={routes.Authentication} element={<ObservedAuthentication/>}/>
                <Route exact path={routes.Contact} element={<ObservedContact/>}/>
                <Route exact path={routes.About} element={<About/>}/>
                <Route exact path={routes.Syntheses} element={
                    <AuthenticatedRoute>
                        <ObserverFiles/>
                    </AuthenticatedRoute>}>
                </Route>
                <Route exact path={routes.Chat} element={
                    <AuthenticatedRoute>
                        <ChatObserver/>
                    </AuthenticatedRoute>
                }/>
                <Route exact path={routes.Calendar} element={
                    <AuthenticatedRoute>
                        <ObservedCalendar/>
                    </AuthenticatedRoute>
                }/>
                <Route exact path={routes.Requests} element={
                    <AuthenticatedRoute>
                        <ObservedRequests/>
                    </AuthenticatedRoute>
                }/>
            </Routes>
        </Router>
    )
}

export default App;