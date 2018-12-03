import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Field } from "react-final-form";

const styles = theme => ({
  base: {
    backgroundColor: "#757de8",
    margin: '10px'
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    gutterBottom: "true",
    backgroundColor: "#3f51b5",
    padding: 10,
    color: '#fff',
  },
  responsive: {
    margin: 20
  },
  button: {
    backgroundColor: "#f44336"
  },
});

const CreateQuiz = props => {
    const { classes, handleNewQuiz, handleChangeQuiz } = props;
    return (
        <div className={classes.base}>
            <Grid>
                <p className={classes.title}> 
                    Create a New Quiz!
                </p>
            </Grid>
            <Grid container className={classes.responsive} spacing={16}>
                <Grid item>
                    <Field
                        name="quizTitle" 
                        component={TextField}
                        type="text" 
                        label="New Quiz Name"
                        onChange={handleChangeQuiz()}/>   
                </Grid>
                <Grid item >
                    <Button variant="fab" 
                        className={classes.button} 
                        onClick={handleNewQuiz}>
                        <AddIcon />
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(CreateQuiz);
