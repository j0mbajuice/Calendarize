import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => (
  <Router>
    <div>
      <Header />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
);

const Header = () => <NavBar />;

export default App;
