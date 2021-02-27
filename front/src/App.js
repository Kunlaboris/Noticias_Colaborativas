import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/"></Route>
          <Route path="/">
            <h1>hola</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
