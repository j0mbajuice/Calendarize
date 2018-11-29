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
import Fab from "@material-ui/core/Fab";
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
        Database.ref("todo/" + userId).on("value", snapshot => {
          var data = {};
          snapshot.forEach(function(item) {
            if (item.val().completed === false) {
              data[item.key] = item.val().todo;
            }
          });
          this.setState({
            todo: data
          });
        });
      }
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleToggle = (value, key) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      this.handleCompletion(key, true);
    } else {
      newChecked.splice(currentIndex, 1);
      this.handleCompletion(key, false);
    }

    this.setState({
      checked: newChecked
    });
  };

  addToDo() {
    var userId = Auth.currentUser.uid;
    var date = new Date().getTime();
    Database.ref("todo/" + userId + "/" + date).set({
      todo: this.state.newToDo,
      completed: false
    });
  }

  updateToDo() {
    var userId = Auth.currentUser.uid;
    Database.ref("todo/" + userId + "/" + this.state.editTaskKey).update({
      todo: this.state.editTask
    });
  }

  handleCompletion(key, checked) {
    var userId = Auth.currentUser.uid;
    Database.ref("todo/" + userId + "/" + key).update({
      completed: checked
    });
  }

  handleDelete() {
    var userId = Auth.currentUser.uid;
    Database.ref("todo/" + userId + "/" + this.state.editTaskKey).remove();
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
          <Fab
            size="small"
            style={{ position: "absolute", right: 660 }}
            onClick={() => this.setState({ taskOpen: true })}
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Fab>
          <Dialog
            open={this.state.taskOpen}
            onClose={() => this.setState({ taskOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create a New Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="newToDo"
                label="Task"
                onChange={this.handleChange.bind(this)}
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

          {Object.keys(this.state.todo).length !== 0 ?
          Object.keys(this.state.todo).map(key => {
            return (
              <div>
                <ListItem dense button disableRipple>
                  <Checkbox
                    label={this.state.todo[key]}
                    key={this.state.todo[key]}
                    onClick={this.handleToggle(this.state.todo[key], key)}
                    checked={this.state.checked.includes(this.state.todo[key])}
                  />
                  <ListItemText>{this.state.todo[key]}</ListItemText>
                  <IconButton
                    aria-label="Edit"
                    onClick={() =>
                      this.setState({
                        editOpen: true,
                        editTask: this.state.todo[key],
                        editTaskKey: key
                      })
                    }
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
          }) :
            <div>
              <ListItem dense button disableRipple>
              <ListItemText align="center">Nothing to do today!</ListItemText>

              </ListItem>
              {/*TODO: Might want to remove divider depending on looks*/}
            </div>

        }

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
                id="editTask"
                label="Task"
                type="text"
                onChange={this.handleChange.bind(this)}
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
                onClick={() => {
                  this.handleDelete();
                  this.setState({ editOpen: false });
                }}
                color="secondary"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  this.updateToDo();
                  this.setState({ editOpen: false });
                }}
                color="primary"
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>


        </List>
      </div>
    );
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToDo);
