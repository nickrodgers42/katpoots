import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "typeface-roboto";
import JoinCard from "./joinCard.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import AppBarComponent from "../appbar/appbar-class";

const styles = {
  root: {
    // flexGrow: 1,
  },
  grid: {
    height: "90vh"
  },
  grow: {
    flexGrow: 1
  }
};

function HomePage(props) {
  const { classes, user, logout } = props;
  return (
    <div className={classes.root}>
      <AppBarComponent history={ props.history } user={ props.user }/>
      <Grid className={classes.grid} container justify="center" alignItems="center">
        <JoinCard />
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  signUpRedirect: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(HomePage);
