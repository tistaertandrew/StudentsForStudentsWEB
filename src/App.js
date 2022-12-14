import './style/index.css'
import routes from './routes.json'
import {ObservedHome} from "./components/pages/Home";
import About from "./components/pages/About";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {ObservedAuthentication} from "./components/pages/Authentication";
import {ObservedContact} from "./components/pages/Contact";
import {ChatObserver} from './components/pages/Chat';
import {sessionStore} from './stores/SessionStore';
import {ObserverFiles} from './components/pages/Files';
import {ObservedCalendar} from "./components/pages/Calendar";
import {ObservedRequests} from "./components/pages/Requests";
import {ObservedMyRequests} from "./components/pages/MyRequests";
import NotFound from "./components/pages/NotFound";
import NotificationsHub from "./models/NotificationsHub";
import {ObservedDashboard} from "./components/pages/Dashboard";

function App() {

    NotificationsHub()

    const AuthenticatedRoute = ({children}) => {
        if (!sessionStore.user) {
            // This way we could give to authentication a callback to redirect to the page the user wanted to access
            return <Navigate to={routes.Authentication}/>
        } else {
            return children
        }
    }

    const AdminRoute = ({children}) => {
        if(!sessionStore.user.isAdmin) {
            return <Navigate to={routes.Home}/>
        } else {
            return children
        }
    }

    return (
        <Router>
            <Routes>
                <Route exact path={routes.Home} element={<ObservedHome/>}/>
                <Route exact path={routes.Authentication} element={<ObservedAuthentication/>}/>
                <Route exact path={routes.Contact} element={<ObservedContact/>}/>
                <Route exact path={routes.About} element={<About/>}/>
                <Route exact path={routes.NotFound} element={<NotFound/>}/>
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
                <Route exact path={routes.MyRequests} element={
                    <AuthenticatedRoute>
                        <ObservedMyRequests/>
                    </AuthenticatedRoute>
                }/>
                <Route exact path={routes.Dashboard} element={
                    <AuthenticatedRoute>
                        <AdminRoute>
                            <ObservedDashboard/>
                        </AdminRoute>
                    </AuthenticatedRoute>
                }/>
            </Routes>
        </Router>
    )
}

export default App;