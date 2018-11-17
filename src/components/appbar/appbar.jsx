import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "typeface-roboto";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
    grow: {
        flexGrow: 1,
        display:"inline-block"
    },
    logo: {
        height: "50px",
        verticalAlign: "middle"
    },
    appTitle: {
        display: "inline-block",
        paddingLeft: "10px"
    },
    pointer: {
        cursor: "pointer"
    },
    underline: {
        textDecoration:"underline"
    }
};

function Appbar(props) {
    const { classes, user, logout } = props;
    return(
        <AppBar position="static">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center" spacing={24}>
                <Grid item>
                    <div onClick={props.homepageRedirect} className={classes.pointer}>
                        <img src={require("../../iconWhite.png")} className={classes.logo} alt="cat logo"/>
                        <Typography 
                            variant="h6" 
                            color="inherit" 
                            className={classes.appTitle}
                        >
                            KatPoots
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                    {user && user.username ? (
                    <Grid container justify="space-between" spacing={16}>
                        <Grid item>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Welcome&nbsp;
                        </Typography>
                        <Typography variant="h6" color="inherit" className={[classes.grow, classes.pointer, classes.underline].join(' ')} onClick={props.userPage}>
                            {user.username}
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" onClick={logout}>
                            Log Out
                        </Button>
                        </Grid>
                    </Grid>
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
    );
}

Appbar.propTypes = {
    signUpRedirect: PropTypes.func.isRequired,
    homepageRedirect: PropTypes.func.isRequired,
    loginRedirect: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
};

export default withStyles(styles)(Appbar);