import React from 'react'
import { Form, Field } from "react-final-form";
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

const NewQuiz = props => {
    const {classes} = props;
    return (
        <Form
            render={({ handleSubmit, reset, submitting, pristine}) => (
                <form onSubmit={handleSubmit}>
                    <Card className={classes.card}>
                        <CardContent>
                            <h2>Quiz Name</h2>
                            <TextField
                                required
                                name="quizname"
                                id="quizname"
                                label="Quiz Name"
                            />
                            <Button variant="fab" color="primary" aria-label="Add">
                                <AddIcon/>
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            )}  
        />
    );
};

export default withStyles(styles)(NewQuiz);