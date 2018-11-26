import React from "react";
import Button from "@material-ui/core/Button";
import { Auth } from "./Firebase";

class Profile extends React.Component {
  handleSubmit = () => {
    Auth.signOut()
      .then(function() {
        console.log("Signed Out");
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    return (
      <div>
        Profile
        <Button onClick={this.handleSubmit} color="primary" variant="contained">
          Sign Out
        </Button>
      </div>
    );
  }
}

export default Profile;
