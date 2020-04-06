import React from "react";
import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";

// page components here:
import HomePage from "./pages/home-page/home-page.component";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <HomePage />
      </main>
      <footer>FOOTER STUFF</footer>
    </div>
  );
}

export default App;
