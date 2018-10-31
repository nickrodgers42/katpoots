import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

const styles = theme => ({
    button: {
        margin: 5
    },
    greenC: {
        backgroundColor: green[500]
    }
});


const QuizLink = props => {
    const {classes} = props;
    return (
        <form>
            <div>
                <label> {props.quizname} </label>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color="primary" 
                    aria-label="Edit">
                    <CreateIcon />
                </Button>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color= "secondary"
                    aria-label="Delete">
                    <DeleteIcon />
                </Button>
                <Button 
                    className={[classes.button, classes.greenC]} 
                    variant="fab" 
                    aria-label="Play">
                    <PlayArrowRounded />
                </Button>
            </div>
        </form>
    )
}

export default withStyles(styles)(QuizLink)