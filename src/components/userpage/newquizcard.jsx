import React from 'react'
import { render } from 'react-dom'
import { withFormik, Formik } from 'formik'
import Yup from 'yup'
import { TextField, Button } from '@material-ui/core';


const QuizCreateForm = (props) => {
    const {
        quizname = "",
    } = props;

    return(
        <form className="quizcreate">
            <h1> Start Making a Quiz </h1>
            <TextField
                required
                name="quizname"
                id="quizname"
                label="Quiz Name"
                helperText="Name of Quiz"
            />
            <Button variant="contained" id="submit=button" color="default">
                Create
            </Button>
        </form>
    )
}

export default QuizCreateForm