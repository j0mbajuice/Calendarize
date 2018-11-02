import React from 'react';
import NavBar from './NavBar.js';
import ToDo from './ToDo.js';
import Grid from "@material-ui/core/Grid";


function App(props) {
  return (
    <div >
      <NavBar />
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <ToDo />
        </Grid>
        <Grid item xs={6}>
          <ToDo />
        </Grid>
      </Grid>
    </div>
  );
}


export default (App);
