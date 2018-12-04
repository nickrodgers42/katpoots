import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";
import PinHolder from "./pinholder"
import UserList from "./userlist"
import {Button} from "@material-ui/core"
import Melee from "../sound/melee.mp3"
import Sounder from "../sound/sounder"
import Sound from 'react-sound'

const styles = theme => ({
    container: {
        height: '90vh'
    },
    startButton: {
        marginBottom: '30px',
        width: '100px',
        height: '50px'
    }
})

const PinPage = props => {
  const { classes, currentQuiz, startQuiz, students, playAudio } = props;
  return (
    <div id = "pinGridDiv">
        <div>
            <AppBarComponent history={ props.history }/>
        </div>
        <Grid container justify="center" alignItems="center" direction="column" className={classes.container}>
            <Grid item>
                <PinHolder pin={currentQuiz.pin}/>
            </Grid>
              <Button onClick={startQuiz} variant="contained" color="primary" className={classes.startButton}>Start</Button>
            <Grid item>
                <UserList students={students}/>
            </Grid>
            <Grid item>
                <Sounder player={Melee} />
            </Grid>
        </Grid>
    </div>
  );
};

export default withStyles(styles)(PinPage);