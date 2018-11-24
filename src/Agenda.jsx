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
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

function getSteps() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let hoursArray = [];
  for (let i=hours; i<hours+5; i++) {
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
          <Button
            mini="mini"
            onClick={() => this.setState({ meetingOpen: true })}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            <AddIcon />
          </Button>
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
                autoFocus="autoFocus"
                margin="dense"
                id="name"
                label="Meeting Agenda"
                type="text"
                fullWidth="fullWidth"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ meetingOpen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.setState({ meetingOpen: false })}
                color="primary"
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
