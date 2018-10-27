import React, { Component } from "react";
import 'typeface-roboto';
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CardContent, TextField, Button, CardActions } from "@material-ui/core";

const styles = {
    card: {
        maxWidth: 400,
    },
};

function JoinCard(props) {
    const { classes } = props; 
    return (
        <Card className={classes.card}>
            <CardContent>
                <h1>Join a Game</h1>
                <TextField
                    variant="outlined"
                    label="Quiz PIN"
                    />
            </CardContent>
            <CardActions>
                <Button 
                    variant="contained"
                    color="primary"
                >
                    Join
                </Button>
            </CardActions>
        </Card>
    )
}

JoinCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(JoinCard);