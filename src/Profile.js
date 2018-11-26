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
    firstName: "",
    lastName: "",
    team: "",
    number: "",
  };

  writeUserData(first, last, team, number) {
    var userId = Auth.currentUser.uid;
    Database.ref("users/" + userId).set({
      firstName: first,
      lastName: last,
      team: team,
      number: number
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleSubmit = () => {
    var userId = Auth.currentUser.uid;
    Database.ref("users/" + userId).set({
      firstName: "Vivian",
      lastName: "Tran",
      team: "Team Leia",
      number: "999-999-9999"
    });
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
                {this.state.email}
              </Typography>
              <div>
                <TextField
                  className={classes.textField}
                  label="First Name"
                  type="firstName"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Last Name"
                  type="firstName"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Phone Number"
                  type="number"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label="Team"
                  type="team"
                  value={this.state.name}
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
