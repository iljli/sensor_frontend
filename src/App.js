import logo from "./logo.svg";
import "./App.css";
import react from "react";
import M from "materialize-css";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Landing from "./components/LandingPage";
import Contacts from "./components/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/login";

function App() {
  return (
    <div className="main">
      <Header />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/userManagment">
          <h1>Nothing to see there for now</h1>
        </Route>

        <Route exact path="/contacts">
          <Contacts />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
