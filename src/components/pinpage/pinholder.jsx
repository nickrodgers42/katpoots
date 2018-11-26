import React from 'react';
import {withStyles} from '@material-ui/core';
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
    }
})

const PinHolder = props => {
    const { classes } = props;
    return (
        <div>
            <Grid container className={classes.grid}>
                <Grid item  className={classes.button}>
                    <Button>This Will Hold the Pin!</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(PinHolder);