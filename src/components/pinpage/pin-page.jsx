import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import AppBarComponent from "../appbar/appbar-class";
import PinHolder from "./pinholder";
import UserList from "./userlist";
import { Button } from "@material-ui/core";
import Sounder from "../sound/sounder";
import Wow from "../sound/wow.mp3";

const styles = theme => ({
  container: {
    height: "90vh"
  },
  startButton: {
    marginBottom: "30px",
    width: "100px",
    height: "50px"
  }
});

const PinPage = props => {
  const {
    classes,
    currentQuiz,
    startQuiz,
    students,
    toggleMusic,
    playing
  } = props;
  return (
    <div id="pinGridDiv">
      <div>
        <AppBarComponent history={props.history} />
      </div>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.container}
      >
        <Grid item>
          <PinHolder pin={currentQuiz.pin} />
        </Grid>
        <Sounder
          player={Wow}
          toggleMusic={toggleMusic}
          playing={playing}
          delay={600}
        />
        <Button
          onClick={startQuiz}
          variant="contained"
          color="primary"
          className={classes.startButton}
        >
          Start
        </Button>
        <Grid item>
          <UserList students={students} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(PinPage);
