import React from "react";
import { withStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },

    textField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    }
});

const QuestionModal = props =>{
    const {handleClose, open, classes, question, handleChange, handleSave} = props;
    return(
    <Modal
        open={open}
        >
        <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
            <TextField
                label="Question Title"
                defaultValue = {question ? question.questionText: null}
                onChange={handleChange(question)}
            />
            </Typography>
            <Typography variant="subtitle1">
            <div>
            <TextField
                required
                label="Answer 1"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                required
                label="Answer 2"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                label="Answer 3"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                label="Answer 4"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={false}
                />
                }
                label="Correct?"
            />
            </div>
            </Typography>
            <button onClick={handleClose}> cancel </button>
            <button onClick={() => handleSave(question)}> save </button>
        </div>
    </Modal>
    )
}

export default withStyles(styles)(QuestionModal);