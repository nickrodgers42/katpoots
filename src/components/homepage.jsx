import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import 'typeface-roboto';
import JoinCard from "./joinCard.jsx";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";

const styles = ({
    root: {
        flexGrow: 1,
    },
    grid: {
        height: "100vh",
    },
    grow: {
        flexGrow: 1,
    }
});

function HomePage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Grid 
                    container
                    justify="space-between"
                    spacing={24}
                >
                    <Grid item>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.grow}
                        >
                            KatPoots
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button>Log In</Button>
                        <Button
                            variant="contained"
                        >   
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Grid className={classes.grid}
            container 
            justify="center"
            alignItems="center"
        >
            <JoinCard />
        </Grid>
        </div>
    )
}

export default withStyles(styles)(HomePage);