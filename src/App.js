import './index.css'
import routes from './routes.json'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import {ObservedAuthentication} from "./components/pages/Authentication";
import {ObservedContact} from "./components/pages/Contact";
import About from "./components/pages/About";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path={routes.Home} element={<Home/>}/>
                <Route exact path={routes.Authentication} element={<ObservedAuthentication />}/>
                <Route exact path={routes.Contact} element={<ObservedContact />}/>
                <Route exact path={routes.About} element={<About />}/>
            </Routes>
        </Router>
    )
}

export default App;