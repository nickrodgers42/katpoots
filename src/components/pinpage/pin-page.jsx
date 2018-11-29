import React from "react";
import { withStyles, TextField, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";
import PinHolder from "./pinholder"
import UserList from "./userlist"
import {Button} from "@material-ui/core"

const styles = theme => ({
    container: {
        height: '90vh'
    }
})

const PinPage = props => {
  const { classes, currentQuiz, startQuiz } = props;
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
            <Button onClick={startQuiz}>Start</Button>
        </Grid>
    </div>
  );
};

export default withStyles(styles)(PinPage);