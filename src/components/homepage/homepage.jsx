import React from "react";
import "typeface-roboto";
import JoinCard from "./joinCard.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBarComponent from "../appbar/appbar-class";

const styles = {
  root: {
    // flexGrow: 1,
  },
  grid: {
    height: "85vh"
  },
  grow: {
    flexGrow: 1
  }
};

function HomePage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBarComponent history={props.history} />
      <Grid className={classes.grid} container justify="center" alignItems="center">
        <JoinCard joinQuiz={props.joinQuiz} setQuiz={props.setQuiz} />
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  user: PropTypes.object,
  joinQuiz: PropTypes.func.isRequired,
  setQuiz: PropTypes.func.isRequired
};

export default withStyles(styles)(HomePage);
