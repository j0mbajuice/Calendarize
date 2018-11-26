import React from "react";
import Button from "@material-ui/core/Button";
import { Auth } from "./Firebase";

class Profile extends React.Component {
  state = {
    email: ""
  };

  componentDidMount() {
    console.log("Is Logged In?");
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({
          email: currentUser.email
        });
      }
    });
  }

  handleSubmit = () => {
    Auth.signOut()
      .then(function() {
        console.log("Signed Out");
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div>
        {this.state.email}
        <Button onClick={this.handleSubmit} color="primary" variant="contained">
          Sign Out
        </Button>
      </div>
    );
  }
}

export default Profile;
