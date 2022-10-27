import routes from './routes.json'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/templates/Home";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path={routes.Home} element={<Home />}></Route>
        </Routes>
      </Router>
  )
}

export default App;