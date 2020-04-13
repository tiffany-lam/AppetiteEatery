import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";
import Test from "./components/test/test.component";
import FooterNav from "./components/footer-nav/footer-nav.component";

// page components here:
import HomePage from "./pages/home-page/home-page.component";
import RestaurantPage from "./pages/restaurant-page/restaurant-page.component";
import ContactUsPage from "./pages/contact-us-page/contact-us.component";
import ErrorPage from "./pages/error-page/error-page.component";
import ProfilePage from "./pages/profile-page/profile-page.component";

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
            <Route
              exact
              path="/restaurant/:restaurantId"
              component={RestaurantPage}
            />

            {/* <Route path="/login" component={} /> */}
            {/* <Route path="/graduated" component={} /> */}
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/test" component={Test} />
            {/* <Route path="/restaurant-page" component={RestaurantPage} /> */}
            <Route path="/profile" component={ProfilePage} />
            <Route to="*" component={ErrorPage} />
          </Switch>
        </main>
        <footer>
          <FooterNav />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
