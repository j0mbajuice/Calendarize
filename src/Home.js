import React from "react";
import ToDo from "./ToDo.js";
import Grid from "@material-ui/core/Grid";
import Agenda from "./Agenda.jsx";
import { Timeline } from 'react-twitter-widgets';
import copyright from './copyright.png';

const LineFooter = ({color}) => (
  <hr style={{ color: color,
               backgroundColor: color,
               height: "0px",
               marginRight: "15px",
               marginLeft: "15px" }}
  />
);

function App(props) {
  return (
    <div>
      <Grid container spacing={12} style={{ padding: "16px" }}>
        <Grid item xs={5}>
          <ToDo />
        </Grid>

        <Grid item xs={5}>
          <Agenda />
        </Grid>

        <Grid item xs={2}>
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'Jvent18' }}
            options={{
              username: 'Joshie',
              height: '600',
              width: '600', }}
            onLoad={() => console.log('Timeline is loaded!')} />
        </Grid>
      </Grid>
      <LineFooter color="grey" />
      <Grid container justify='center' alignContent='baseline'
            style={{ fontWeight: "bold",}}>
        Calendarize
        <img src={copyright} width="9px" height="9px" />
        2018
      </Grid>
    </div>
  );

}

export default App;
