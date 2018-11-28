import React from "react";
import firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Auth, GoogleAuthProvider } from './Firebase';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: { //classname == root
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: { //classname == container
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: "100%",
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
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
    email: "",
    password: ""
  };

  handleChange(e) {
    this.setState({
      [e.target.type]: e.target.value,
    });
  }

  handleSubmit = () => {
    Auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        console.log(error);
      });
  }

  handleGoogle = () => {
    firebase.auth().signInWithPopup(GoogleAuthProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5" component="h3"
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            textAlign: 'center',
            backgroundColor: "lightblue",
            paddingTop: '20px' }}
          >
              WELCOME!
          </Typography>
          <Grid
          container
          style={{ padding: "16px", backgroundColor: "lightblue" }}
          direction="row"
          alignItems="center"
          justify="center"
          className="classes.root"
        >
          <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3"
              style={{
                fontSize: "24px",
                fontWeight: "bold" }}
              >
              Login
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
                style={{ marginRight: "10px"}}
              />
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <MuiThemeProvider theme={theme}>
                <Button variant="contained" onClick={this.handleSubmit}
                  style={{ width: '500px', fontSize: "16px"}}
                  color="secondary"
                  className={classes.margin}
                  label="Submit"
                  type="submit">
                  Sign In
                </Button>
                </MuiThemeProvider>
                </Grid>
                
                <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Button variant="contained" onClick={this.handleGoogle}
                  style={{ width: '500px', fontSize: "16px"}}
                  color="secondary"
                  className={classes.margin}
                  label="Submit"
                  type="submit">
                  Sign in with Google
                </Button>
              </Grid>

              
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  Don't have an account?
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
