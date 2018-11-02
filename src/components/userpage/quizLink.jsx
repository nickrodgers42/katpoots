import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrow from '@material-ui/icons/PlayArrow';
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

const styles = theme => ({
    button: {
        margin: 5
    },
    green: {
        backgroundColor: green[500]
    },
    red: {
        backgroundColor: red[500]
    },
    yellow: {
        backgroundColor: yellow[900]
    },
    iconColor: {
        color: '#fff',
    }
});


const QuizLink = props => {
    const {classes} = props;
    return (
        <form>
            <div>
                <label> {props.quizname} </label>
                <Button 
                    className={[classes.button, classes.yellow]} 
                    variant="fab" 
                    color="primary" 
                    aria-label="Edit">
                    <CreateIcon className={classes.iconColor}/>
                </Button>
                <Button 
                    className={[classes.button, classes.red]} 
                    variant="fab" 
                    color= "secondary"
                    aria-label="Delete">
                    <DeleteIcon className={classes.iconColor}/>
                </Button>
                <Button 
                    className={[classes.button, classes.green]} 
                    variant="fab" 
                    aria-label="Play">
                    <PlayArrow className={classes.iconColor}/>
                </Button>
            </div>
        </form>
    )
}

export default withStyles(styles)(QuizLink)