import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";
import { Auth } from "./Firebase";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route
            path="/login"
            render={() =>
              this.state.isLoggedIn ? <Redirect to="/profile" /> : <Login />
            }
          />
          <Route
            path="/signup"
            render={() =>
              this.state.isLoggedIn ? <Redirect to="/profile" /> : <SignUp />
            }
          />
          <Route
            exact
            path="/"
            render={() =>
              !this.state.isLoggedIn ? <Redirect to="/login" /> : <Home />
            }
          />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

const Header = () => <NavBar />;

export default App;
