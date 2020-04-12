import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";
import Test from "./components/test/test.component";
import RegisterModal from "./components/auth/RegisterModal"
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
            <Route exact path="/" component={HomePage} />
            
            {/* <Route path="/graduated" component={} /> */}
            {/* <Route exact path="/" component={HomePage} /> */}
            {/* EXAMPLE: */}
            <Route path="/test" component={Test} />
          </Switch>
        </main>
        <footer>FOOTER STUFF</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
