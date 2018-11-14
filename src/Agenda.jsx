import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

function getSteps() {
  return ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Meeting with Vivian`;
    case 2:
      return "Meeting with Marta";
    case 4:
      return 'Lunch';
    case 8:
        return `Meeting with Josh`;
    default:
      return "";
  }
}

class Agenda extends React.Component {
  state = {
      activeStep: 1,
    };

  render() {
  const steps = getSteps();
  const { activeStep } = this.state;

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography variant="h5" color="inherit">
          Agenda
        </Typography>
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
