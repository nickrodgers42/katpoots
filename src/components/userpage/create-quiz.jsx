import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles, TextField, FormHelperText } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"
import { Field } from 'react-final-form';

const styles = theme => ({
    base: {
        backgroundColor: "#BA68C8",
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        gutterBottom: "true",
        backgroundColor: "#AB47BC",
        padding: 10
    },
    responsive: {
        margin: 20,
    },
    button: {
        backgroundColor: "#99fd00"
    },
})

const CreateQuiz = props => {
    const { classes } = props;
    return (
        <div className={classes.base}>
            <Grid>
                <p className={classes.title}> 
                    Create a New Quiz!
                </p>
            </Grid>
            <Grid container className={classes.responsive} spacing={16}>
                <Grid item>
                    <Field name="quizTitle" component={TextField} type="text" label="New Quiz Name"/>
                </Grid>
                <Grid item >
                    <Button variant="fab" className={classes.button}>
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(CreateQuiz);