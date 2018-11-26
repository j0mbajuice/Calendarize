import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Auth } from './Firebase';

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

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.type]: e.target.value,
    });
  }

  handleSubmit = () => {
    Auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        console.log(error);
      });
    console.log("Created User");
  }

  componentDidMount(){
    console.log("Is Logged In?");
    Auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log(currentUser.email);
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
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
              Sign Up
            </Typography>
            <div>
              <TextField
                className={classes.textField}
                label="Email"
                type="email"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <TextField
                className={classes.textField}
                label="Password"
                type="password"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <TextField
                className={classes.textField}
                label="Password"
                type="confirmPassword"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Button onClick={this.handleSubmit} variant="contained" color="primary">
                  Sign Up
                </Button>
              </Grid>
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "12px"
                  }}
                >
                  Already have any account? Login here!
                </Link>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
