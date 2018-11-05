import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
    <Typography variant="h5" color="inherit">
      To Do
    </Typography>
    </Grid>
      <List component="nav">
      <li>
        <Divider />
      </li>
        <ListItem dense button>
          <Checkbox checked={0} disableRipple />
          <ListItemText>To Do Item</ListItemText>
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem dense button>
          <Checkbox checked={0} disableRipple />
          <ListItemText>To Do Item</ListItemText>
        </ListItem>
        <li>
          <Divider inset />
        </li>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
