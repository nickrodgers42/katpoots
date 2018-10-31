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


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    backgroundColor: theme.backgroundColor,
    maxWidth: 800
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  grid: {
    height: "90vh",
  },
  textField: {
    width: 400
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

const Register = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root} spacing={16}>
     <AppBar position="static">
            <Toolbar>
                <Grid 
                    container
                    justify="flex-start"
                    spacing={24}
                >
                    <Grid item>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                            onClick={ props.homepageRedirect }
                        >
                            KatPoots
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
          </AppBar>
      <Grid item xs={12}>
        <Grid container className={classes.grid} justify="center" alignItems="center" spacing={4}>
          <Form
            className={classes.container}
            onSubmit={props.onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="h3"
                      color="inherit"
                    >
                      Sign Up
                    </Typography>
                    <div>
                      <Field
                        className={classes.textField}
                        name="firstName"
                        component={TextField}
                        type="text"
                        label="First Name"
                      />
                    </div>
                    <div>
                      <Field
                        className={classes.textField}
                        name="lastName"
                        component={TextField}
                        type="text"
                        label="Last Name"
                      />
                    </div>
                    <div>
                      <Field
                        className={classes.textField}
                        name="email"
                        component={TextField}
                        type="email"
                        label="Email"
                      />
                    </div>
                    <div>
                      <Field
                        className={classes.textField}
                        name="password"
                        component={TextField}
                        type="password"
                        label="password"
                      />
                    </div>
                    <div>
                      <Field
                        className={classes.textField}
                        name="username"
                        component={TextField}
                        type="text"
                        label="username"
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <Grid container justify = "space-between">
                  <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        type="button"
                        onClick={reset}
                        disabled={submitting || pristine}
                        size="large"
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                        disabled={submitting || pristine}
                        size="large"
                      >
                        Submit
                      </Button>
                      </Grid>
                  </CardActions>
                </Card>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(Register);
