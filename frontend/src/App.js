import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Room from "./containers/Room";
import { pagePaths } from "./utils/constants";
import Dashboard from "./containers/Dashboard";
const uuid = require("uuid");

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="*" to path={pagePaths.root} />
        <Redirect
          exact
          path={pagePaths.root}
          to={`${pagePaths.dashboard}/${uuid.v1()}`}
        />
        <Route path={`${pagePaths.room}/:id`} component={Room} />
        <Route path={`${pagePaths.dashboard}/:id`} component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
