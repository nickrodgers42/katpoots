import React from 'react';
import {withStyles, Paper, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const styles = theme => ({
    button: {
        margin: 10,
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        margin: 20,
        padding: 50,
        backgroundColor: "primary",
        square: 'false'
    }
})

const PinHolder = props => {
    const { classes, pin } = props;
    return (
        <div>
            <Grid container direction="column" alignItems="center">
                <Grid item  className={classes.button}>
                    <Paper>
                        <Typography variant="h2" className={classes.paper}>
                            {pin}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(PinHolder);