import React from "react";
import { withStyles, TextField, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";

const styles = theme => ({
    
})

const PinPage = props => {
  const { classes } = props;
  return (
    <div id = "pinGridDiv">
        <div>
            <AppBarComponent history={ props.history }/>
        </div>
        <div>
            <p>Butt</p>
        </div>
        <div>
            <p>Hole</p>
        </div>
    </div>
  );
};

export default withStyles(styles)(PinPage);