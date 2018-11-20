import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ToDo extends React.Component {
  state = {
    checked: [],
    data: [
      "To Do 1",
      "To Do 2",
      "To Do 3",
      "To Do 4",
      "To Do 5",
      "To Do 6"
    ],
    taskOpen: false,
    editOpen: false,
    editTask: ""
  };

  handleToggle = value => () => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({checked: newChecked});
  }

  render() {
    return (<div>
      <Grid container="container" spacing={0} direction="row" alignItems="center" justify="center">
        <Typography variant="h5" color="inherit">
          To Do
        </Typography>
        {/* TODO: Need to move to the right */}
        <Button mini="mini" onClick={() => this.setState({taskOpen: true})} variant="fab" color="primary" aria-label="Add">
          <AddIcon/>
        </Button>
        <Dialog open={this.state.taskOpen} onClose={() => this.setState({taskOpen: false})} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a New Task</DialogTitle>
          <DialogContent>
            <TextField autoFocus="autoFocus" margin="dense" id="name" label="Task" type="text" fullWidth="fullWidth"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({taskOpen: false})} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => this.setState({taskOpen: false})} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <List component="nav">
        <li>
          <Divider/>
        </li>

        {
          this.state.data.map(value => <div>
            <ListItem dense="dense" button="button" disableRipple="disableRipple">
              <Checkbox label={value} key={value.toString()} onClick={this.handleToggle(value)} checked={this.state.checked.includes(value)}/>
              <ListItemText>{value}</ListItemText>
              <IconButton aria-label="Edit" onClick={() => this.setState({editOpen: true, editTask: value})}>
                <EditIcon fontSize="small"/>
              </IconButton>
            </ListItem>
            {/*TODO: Might want to remove divider depending on looks*/}
            <li><Divider/></li>
          </div>)
        }

        <Dialog open={this.state.editOpen} onClose={() => this.setState({editOpen: false})} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
            <TextField defaultValue={this.state.editTask} autoFocus="autoFocus" margin="dense" id="name" label="Task" type="text" fullWidth="fullWidth"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({editOpen: false})} color="default">
              Cancel
            </Button>
            <Button onClick={() => this.setState({editOpen: false})} color="secondary">
              Delete
            </Button>
            <Button onClick={() => this.setState({editOpen: false})} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>

        <li>
          <Divider inset="inset"/>
        </li>
      </List>
    </div>);
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToDo);
