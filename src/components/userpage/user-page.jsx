import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import ObjList from '../item-containers/objList'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    card: {
        backgroundColor: theme.backgroundColor,
        maxwidth: 300,
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        width: 400
    },
    button: {
        margin: 20
    }
})

const UserPage = props => {
    const {classes} = props;
    return (
        <div>
            <Grid>
                <h2>Holds the logobar?</h2>
            </Grid>
            <Grid container spacing={24}>
                <Grid item>
                    <ObjList />
                </Grid>
                <Grid item>
                    Will Hold Something Else 1?
                </Grid>
                <Grid item>
                    Will Hold Something Else 1?
                </Grid>
            </Grid>
            
        </div>
    )
};

export default withStyles(styles)(UserPage);