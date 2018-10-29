import React from "react";
import { withStyles } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextField from "../text-field/text-field";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

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
  textField: {
    width: 400
  },
  button: {
    margin: 20
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
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          <Form
            className={classes.container}
            onSubmit={props.onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                  <CardContent>
                    <h1>Register</h1>
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
                    <div className="buttons">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                        disabled={submitting || pristine}
                      >
                        Submit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        type="button"
                        onClick={reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
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
