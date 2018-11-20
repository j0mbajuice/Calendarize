import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";

const App = () => (<Router>
  <div>
    <Header/>
    <Route path="/login" component={Login}/>
    <Route path="/" exact component={Home}/>
    <Route path="/profle/" component={Profile}/>
  </div>
</Router>);

const Header = () => (<NavBar/>);

export default App;
