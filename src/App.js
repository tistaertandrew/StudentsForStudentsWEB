import './index.css'
import routes from './routes.json'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Authentication from "./components/pages/Authentication";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path={routes.Home} element={<Home/>}/>
                <Route exact path={routes.Authentication} element={<Authentication />}/>
            </Routes>
        </Router>
    )
}

export default App;