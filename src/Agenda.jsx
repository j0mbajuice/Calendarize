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
// Function to great next 10 half hour steps (circles)
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

class Agenda extends React.Component {
  state = {
    activeStep: 1,
    meetingOpen: false
  };

  componentDidMount() {
    this.getAgenda();

    // var utcSeconds = 1234567890;
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);
    // console.log(d);
  }

  getStepContent(step) {
    var current = new Date().getHours()
    console.log(current - step)
    var data = this.state.agenda
    if (!(data === undefined)){
      if (!(data[step] === undefined)) {
        return data[step]
      }
    }
  }

  addAgenda() {
    var year = this.state.date.getFullYear();
    var month = this.state.date.getMonth();
    var day = this.state.date.getDate();
    var hours = this.state.time.getHours();
    var minutes = this.state.time.getMinutes();

    var d = new Date(year, month, day, hours, minutes, 0, 0);
    var date = d.getTime() / 1000;

    var userId = Auth.currentUser.uid;
    Database.ref("agenda/" + userId).update({
      [date]: this.state.agendaText
    });
  }

  getAgenda = () => {
    Auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        var userId = Auth.currentUser.uid;
        Database.ref("agenda/" + userId).on("value", snapshot => {
          var data = {};
          snapshot.forEach(function(snapshot) {
            var currentDate = Math.floor(new Date().getTime() / 1000);
            var currentHour = new Date().getHours()
            var datePlus5 = currentDate + (5*60*60);
            if (currentDate < snapshot.key && snapshot.key < datePlus5) {
              var d = new Date(0);
              d.setUTCSeconds(snapshot.key);
              var minutes = d.getMinutes();
              if (minutes < 30) {
                console.log("Hours " + d.getHours())
                data[(d.getHours() - currentHour) * 2] = snapshot.val();
              } else {
                console.log("Half " + d.getHours())
                console.log("Index " + (d.getHours() - currentHour + 1) * 2)
                data[(d.getHours() - currentHour + .5) * 2] = snapshot.val();
              }
            }
          });
          this.setState({
            agenda: data
          });
          console.log(this.state.agenda)
        });
      }
    });
  };

  onChangeDate = (date: Date) => {
    this.setState({ date: date });
  };

  onChangeTime = (time: Date) => {
    this.setState({ time: time });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }


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
                id="agendaText"
                label="Agenda Name"
                type="text"
                onChange={this.handleChange.bind(this)}
                fullWidth
              />
              <div style={{ paddingTop: "15px" }}>
                <DateFormatInput
                  name="date-input"
                  value={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div style={{ paddingTop: "15px" }}>
                <TimeFormatInput
                  name="time-input"
                  value={this.state.time}
                  onChange={this.onChangeTime}
                  style={{ paddingTop: "15px" }}
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
                <StepLabel icon={label}>{this.getStepContent(index)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default Agenda;
