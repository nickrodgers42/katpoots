import React from "react";
import 'typeface-roboto';
import Card from "@material-ui/core/Card";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CardContent, TextField, Button, CardActions, CardHeader, Grid } from "@material-ui/core";

const styles = {
    card: {
        maxWidth: 500,
    },
    cardActions: {
        textAlign: 'right',
        width: '100%'
    },
};

function JoinCard(props) {
    const { classes } = props; 
    return (
        <Card className={classes.card}>
            <CardHeader
                title="Join a Quiz"
            ></CardHeader>
            <CardContent>
                <TextField
                    variant="outlined"
                    label="Quiz PIN"
                    />
            </CardContent>
            <CardActions>
                <Grid>
                    <Grid item>
                        <Button 
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Join
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

JoinCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(JoinCard);