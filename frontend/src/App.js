import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";

// page components here:
import HomePage from "./pages/home-page/home-page.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/" component={HomePage} />
            {/* <Route path="/login" component={} /> */}
            {/* <Route path="/graduated" component={} /> */}
          </Switch>
          {/* EXAMPLE: */}
          {/* <Route path="/test" component={TestComponentOrPage} /> */}
        </main>
        <footer>FOOTER STUFF</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
