import React from "react";
import Button from "@material-ui/core/Button";
import { Auth, Database } from "./Firebase";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    margin: 30,
    width: 250
  }
});

class Profile extends React.Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    team: "",
    number: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = () => {
    var userId = Auth.currentUser.uid;
    console.log(userId);
    Database.ref("users/" + userId).set({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      team: this.state.team,
      number: this.state.number
    });
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        var userId = Auth.currentUser.uid;
        Database.ref("users/" + userId)
          .once("value")
          .then(snapshot => {
            this.setState({
              firstName: snapshot.val().firstName,
              lastName: snapshot.val().lastName,
              team: snapshot.val().team,
              number: snapshot.val().number
            });
          });
      }
    });
  };

  handleSignOut = () => {
    Auth.signOut()
      .then(function() {
        console.log("Signed Out");
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <Grid
            container
            style={{ padding: "16px" }}
            direction="row"
            alignItems="center"
            justify="center"
            className="classes.root"
          >
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="h5" component="h3">
                {this.state.firstName}
              </Typography>
              <div>
                <TextField
                  className={classes.textField}
                  label="First Name"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Last Name"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Phone Number"
                  type="number"
                  id="number"
                  value={this.state.number}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Team"
                  id="team"
                  value={this.state.team}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <Grid container justify="center" style={{ paddingTop: "15px" }}>
                  <Button
                    onClick={this.handleSubmit}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                  <Button onClick={this.handleSignOut} color="secondary">
                    Sign Out
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
