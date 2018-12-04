import React from "react";
import "typeface-roboto";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CardContent, Button, CardActions, CardHeader, Grid } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextField from "../text-field/text-field";
import axios from "axios";

const styles = {
  card: {
    minWidth: 300
  },
  cardActions: {
    textAlign: "right",
    width: "100%"
  }
};

const isPinValid = async (values, errors, setQuiz) => {
  try {
    const res = await axios.get(`/api/quiz/findByPin/${values.pin}`);
    await setQuiz(res.data);
    return errors;
  } catch (e) {
    return Object.assign({}, errors, { pin: "Pin Is Invalid" });
  }
};

function JoinCard(props) {
  const { classes, setQuiz } = props;
  const validate = values => {
    const errors = {};
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    });
    return isPinValid(values, errors, setQuiz);
  };
  return (
    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12}>
        <Grid container className={classes.grid} justify="center" alignItems="center" spacing={8}>
          <Form
            className={classes.container}
            onSubmit={props.joinQuiz}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                  <Grid container justify="center">
                    <CardHeader title="Join a Quiz" />
                  </Grid>
                  <CardContent>
                    <Grid container justify="center">
                      <div>
                        <Field name="pin" component={TextField} type="text" variant="outlined" label="Quiz PIN" />
                      </div>
                    </Grid>
                    <Grid container justify="center">
                      <div>
                        <Field
                          name="displayName"
                          component={TextField}
                          type="text"
                          variant="outlined"
                          label="Display Name"
                        />
                      </div>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Button
                        variant="outlined"
                        color="secondary"
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
                        size="large"
                        type="submit"
                        disabled={submitting || pristine}
                      >
                        Join
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
}

JoinCard.propTypes = {
  classes: PropTypes.object.isRequired,
  joinQuiz: PropTypes.func.isRequired,
  setQuiz: PropTypes.func.isRequired
};

export default withStyles(styles)(JoinCard);
