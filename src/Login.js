import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class Login extends React.Component {
  state = {
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
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
          container="container"
          style={{ padding: "16px" }}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Paper style={{width:'250px'}} elevation={1}>
            <Typography variant="h5" component="h3">
              Login
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-name"
                label="Email"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Password"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Email"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Password"
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
            </form>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
