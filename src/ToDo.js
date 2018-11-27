import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Database, Auth } from "./Firebase";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ToDo extends React.Component {
  state = {
    checked: [],
    todo: {},
    data: [],
    taskOpen: false,
    editOpen: false,
    editTask: "",
    editTaskKey: ""
  };

  componentDidMount() {
    this.getToDo();
  }

  getToDo = () => {
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        var userId = Auth.currentUser.uid;
        Database.ref("todo/" + userId)
          .once("value")
          .then(snapshot => {
            var data = {};
            snapshot.forEach(function(item) {
              data[item.key] = item.val().todo;
            });
            this.setState({
              todo: data
            });
            console.log(this.state.todo);
          });
      }
    });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  addToDo() {
    var userId = Auth.currentUser.uid;
    var date = new Date().getTime();
    Database.ref("todo/" + userId + "/" + date).set({
      todo: "To Do",
      completed: false
    });
  }

  updateToDo() {
    console.log("Edit Task")
    var userId = Auth.currentUser.uid;
    Database.ref("users/" + userId + "/" + this.state.editTaskKey).set({
      todo: this.state.editTask
    });
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Typography variant="h5" color="inherit">
            To Do
          </Typography>
          {/* TODO: Need to move to the right */}
          <Button
            mini
            onClick={() => this.setState({ taskOpen: true })}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
          <Dialog
            open={this.state.taskOpen}
            onClose={() => this.setState({ taskOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create a New Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Task"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ taskOpen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  this.setState({ taskOpen: false });
                  this.addToDo();
                }}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <List component="nav">
          <li>
            <Divider />
          </li>

          {Object.keys(this.state.todo).map(key => {
            return (
              <div>
                <ListItem dense button disableRipple>
                  <Checkbox
                    label={this.state.todo[key]}
                    key={this.state.todo[key]}
                    onClick={this.handleToggle(this.state.todo[key])}
                    checked={this.state.checked.includes(this.state.todo[key])}
                  />
                  <ListItemText>{this.state.todo[key]}</ListItemText>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => this.setState({ editOpen: true, editTask: this.state.todo[key], editTaskKey: key })}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                {/*TODO: Might want to remove divider depending on looks*/}
                <li>
                  <Divider />
                </li>
              </div>
            );
          })}

          <Dialog
            open={this.state.editOpen}
            onClose={() => this.setState({ editOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                defaultValue={this.state.editTask}
                autoFocus
                margin="dense"
                id="name"
                label="Task"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ editOpen: false })}
                color="default"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.setState({ editOpen: false })}
                color="secondary"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  this.updateToDo()
                  this.setState({ editOpen: false })
                }}
                color="primary"
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>

          <li>
            <Divider inset />
          </li>
        </List>
      </div>
    );
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToDo);
