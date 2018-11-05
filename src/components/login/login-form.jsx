import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextField from "../text-field/text-field";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { CardContent, CardActions } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppBarComponent from '../appbar/appbar';


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        backgroundColor: theme.backgroundColor,
        width: 400
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    grid: {
        height: "90vh",
    }
});

const validate = values => {
    const errors = {};
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    });
    return errors;
  };

function LoginForm(props) {
    const { classes } = props;
    return(
        <Grid container className={classes.root}>
            <AppBarComponent history={props.history} />
        <Grid 
            container 
            className={classes.grid}
            justify="center"
            alignItems="center"
        >
            <Form
                className={classes.container}
                onSubmit={props.onSubmit}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine}) => (
                    <form onSubmit={handleSubmit}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography
                                variant="h3"
                                color="inherit"
                            >
                                Log In
                            </Typography>
                            <Field
                                name="username"
                                component={TextField}
                                type="text"
                                label="Username"
                                fullWidth
                            />
                            <Field
                                name="password"
                                component={TextField}
                                type="password"
                                label="Password"
                                fullWidth
                            />
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitting || pristine}
                                    size="large"
                                >
                                    Log In
                                </Button> 
                            </Grid>
                        </CardActions>
                    </Card>
                    </form>
                )} 
            />
            </Grid>
        </Grid>
    )
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);