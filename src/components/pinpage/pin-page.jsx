import React from "react";
import { withStyles, TextField, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";
import PinHolder from "./pinholder"
import UserList from "./userlist"

const styles = theme => ({
    container: {
        height: '90vh'
    }
})

const PinPage = props => {
  const { classes, currentQuiz } = props;
  return (
    <div id = "pinGridDiv">
        <div>
            <AppBarComponent history={ props.history }/>
        </div>
        <Grid container justify="center" alignItems="center" direction="column" className={classes.container}>
            <Grid item>
                <PinHolder pin={currentQuiz.pin}/>
            </Grid>
            <Grid item>
                <UserList/>
            </Grid>
        </Grid>
    </div>
  );
};

export default withStyles(styles)(PinPage);