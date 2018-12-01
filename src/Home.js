import React from "react";
import ToDo from "./ToDo.js";
import Grid from "@material-ui/core/Grid";
import Agenda from "./Agenda.jsx";
import { Timeline } from 'react-twitter-widgets';

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
              screenName: 'Jvent18'
            }}
            options={{
            username: 'Joshie',
            height: '600',
            width: '300'
            }}
        onLoad={() => console.log('Timeline is loaded!')}
        />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
