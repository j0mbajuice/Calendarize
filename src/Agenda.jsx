import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { Auth, Database } from "./Firebase";
import { DateFormatInput, TimeFormatInput } from "material-ui-next-pickers";

// TODO: Find a way to convert to am/pm rather than military time
function getSteps() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let hoursArray = [];
  for (let i = hours; i < hours + 5; i++) {
    hoursArray.push(i);
    hoursArray.push(" ");
  }
  return hoursArray;
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Meeting with Vivian`;
    case 1:
      return `Meeting with Vivian`;
    case 2:
      return "Meeting with Marta";
    case 3:
      return "Meeting with Marta";
    case 4:
      return "Lunch";
    case 8:
      return `Meeting with Josh`;
    default:
      return "";
  }
}

class Agenda extends React.Component {
  state = {
    activeStep: 1,
    meetingOpen: false
  };

  componentDidMount() {
    // this.getAgenda();

    // var utcSeconds = 1234567890;
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);
    // console.log(d);
  }

  addAgenda() {
    var year = this.state.date.getFullYear()
    var month = this.state.date.getMonth()
    var day = this.state.date.getDate()
    var hours = this.state.time.getHours()
    var minutes = this.state.time.getMinutes()

    var d = new Date(year, month, day, hours, minutes, 0, 0);
    var date = d.getTime() / 1000

    var userId = Auth.currentUser.uid;
    Database.ref("agenda/" + userId).update({
      [date]: "Agenda Item"
    });
    console.log(date)
  }

  getAgenda = () => {
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        var userId = Auth.currentUser.uid;
        Database.ref("agenda/" + userId).on("value", snapshot => {
          var data = {};
          snapshot.forEach(function(snapshot) {
            var currentDate = Math.floor(new Date().getTime() / 1000)
            console.log(snapshot.key)
            console.log(snapshot)
            if (currentDate < snapshot.key) {

              // data[item.key] = item.val().agenda;
            }
          });
          this.setState({
            agenda: data
          });
        });
      }
    });
  };

  onChangeDate = (date: Date) => {
    console.log("Date: ", date);
    this.setState({ date: date });
  };

  onChangeTime = (time: Date) => {
    // console.log("Time: ", time);
    this.setState({ time: time });
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

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
            Agenda
          </Typography>
          {/* TODO: Need to move to the right */}
          <Fab
            size="small"
            style={{ position: "absolute", right: 30 }}
            onClick={() => this.setState({ meetingOpen: true })}
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Fab>
          <Dialog
            open={this.state.meetingOpen}
            onClose={() => this.setState({ taskOpen: false })}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Create a New Meeting
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="name"
                label="Meeting Agenda"
                type="text"
                fullWidth
              />
            <div style={{paddingTop: '15px'}}>
              <DateFormatInput
                name="date-input"
                value={this.state.date}
                onChange={this.onChangeDate}
              />
          </div>
          <div style={{paddingTop: '15px'}}>
              <TimeFormatInput
                name="time-input"
                value={this.state.time}
                onChange={this.onChangeTime}
                style={{paddingTop: '15px'}}
              />
          </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ meetingOpen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  this.setState({ meetingOpen: false });
                  this.addAgenda();
                }}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel icon={label}>{getStepContent(index)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default Agenda;
