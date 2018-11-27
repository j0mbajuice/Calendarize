import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Auth, Database } from './Firebase';
import green from '@material-ui/core/colors/green';

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
    width: 400
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#03a9f4',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: "50px",
    color: 'white',
  },
});

class Login extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = () => {
    Auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        console.log(error);
      }).then(function(results) {
        console.log(results);
      }) ;
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
      <div style={{ height: "100px" }}>
        <Grid
          container
          style={{
            padding: "16px",
            backgroundColor: "lightblue" }}
          direction="row"
          alignItems="center"
          justify="center"
          className="classes.root"
        >
          <Paper className={classes.paper} elevation={1}>
            <Typography
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
              variant="h5"
              component="h3">
              Sign Up
            </Typography>
            <div>
              <TextField // Email Address form
                className={classes.textField}
                label="Email Address"
                id="email"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <TextField // Password form
                className={classes.textField}
                label="Password"
                type="password"
                id="password"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <TextField // Confirm password form
                className={classes.textField}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                margin="normal"
              />
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <MuiThemeProvider theme={theme}>
                <Button onClick={this.handleSubmit} variant="contained"
                  style={{
                    width: '500px',
                    fontSize: '16px',
                    marginTop: '10px',
                    marginBottom: '10px'
                  }}
                  color="secondary"
                  label="Submit"
                  type="submit">
                  Register
                </Button>
                </MuiThemeProvider>
              </Grid>
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  Already have any account?
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
