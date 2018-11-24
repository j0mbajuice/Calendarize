import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
    name: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="standard-name"
                label="Email"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                className={classes.textField}
                id="standard-name"
                label="Password"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                className={classes.textField}
                id="standard-name"
                label="Password"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <Grid container justify="center" style={{ paddingTop: "15px" }}>
                <Button variant="contained" color="primary">
                  Submit
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
            </form>
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
