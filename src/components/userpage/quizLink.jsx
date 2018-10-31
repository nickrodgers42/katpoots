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
        color: 'yellow'
    }
});


const QuizLink = props => {
    const {classes} = props;
    return (
        <form>
            <div>
                <label> This is a Test, I need halp with passing props </label>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color={yellow} 
                    aria-label="Edit">
                    <CreateIcon />
                </Button>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color= {red}
                    aria-label="Delete">
                    <DeleteIcon />
                </Button>
                <Button 
                    className={classes.button} 
                    variant="fab" 
                    color={green}
                    aria-label="Play">
                    <PlayArrowRounded />
                </Button>
            </div>
        </form>
    )
}

export default withStyles(styles)(QuizLink)