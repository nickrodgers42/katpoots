import React from 'react';
import {withStyles} from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    displayName: {
        padding: "20px"
    },
    container: {
        width: "800px"
    }
})

const UserList = props => {
    const {classes, students} = props;
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                className={classes.container}
                spacing={24}
            >
            {students.map(student =>{
                return(
                    <Grid item xs={3}>
                        <Paper elevation={4}>
                            <Typography variant="h6" align="center" className={classes.displayName}>
                                {student.displayName}
                            </Typography>
                        </Paper>
                    </Grid>
                )
            })}
            </Grid>
        </div>
    )
}

export default withStyles(styles)(UserList)