import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "typeface-roboto";
import JoinCard from "./joinCard.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";

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
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={24}>
            <Grid item>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                KatPoots
              </Typography>
            </Grid>
            <Grid item>
              {user.username ? (
                <div>
                  <Typography variant="h6" color="inherit" className={classes.grow}>{`Welcome ${
                    user.username
                  }!`}</Typography>
                  <Button color="inherit" onClick={logout}>
                    Log Out
                  </Button>
                </div>
              ) : (
                <div>
                  <Button color="inherit" onClick={props.loginRedirect}>
                    Log In
                  </Button>
                  <Button variant="contained" onClick={props.signUpRedirect}>
                    Sign Up
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.grid} container justify="center" alignItems="center">
        <JoinCard />
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  signUpRedirect: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(HomePage);
