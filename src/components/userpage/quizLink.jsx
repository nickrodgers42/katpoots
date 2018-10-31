import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const styles = theme => ({
    button: {
        margin: 20
    }
});


const QuizLink = props => {
    const {classes} = props;
    return (
        <form>
            <div>
                <label> {props.name} </label>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color="primary" 
                    aria-label="Edit">
                    <CreateIcon />
                </Button>
                <Button 
                    variant="fab" 
                    color="primary" 
                    aria-label="Delete">
                    <DeleteIcon />
                </Button>
            </div>
        </form>
    )
}

export default withStyles(styles)(QuizLink)