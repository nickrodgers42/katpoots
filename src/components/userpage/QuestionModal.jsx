import React from "react";
import { withStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
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
    const {handleClose, open, classes, question, handleChange, answers, handleSave, handleChangeAnswer, handleCheck} = props;
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
                defaultValue = {answers[0] ? answers[0].answerText: null}
                onChange={handleChangeAnswer(answers[0], 0)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(answers[0], 0)}
                    defaultChecked={answers[0] ? answers[0].correctAnswer: false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                required
                label="Answer 2"
                defaultValue = {answers[1] ? answers[1].answerText: null}
                onChange={handleChangeAnswer(answers[1], 1)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(answers[1], 1)}
                    defaultChecked={answers[1] ? answers[1].correctAnswer: false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                label="Answer 3"
                defaultValue = {answers[2] ? answers[2].answerText: null}
                onChange={handleChangeAnswer(answers[2], 2)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(answers[2], 2)}
                    defaultChecked={answers[2] ? answers[2].correctAnswer: false}
                />
                }
                label="Correct?"
            />
            </div>
            <div>
            <TextField
                label="Answer 4"
                defaultValue = {answers[3] ? answers[3].answerText: null}
                onChange={handleChangeAnswer(answers[3], 3)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={answers[3] ? handleCheck(answers[3], 3):null}
                    defaultChecked={answers[3] ? answers[3].correctAnswer: false}
                />
                }
                label="Correct?"
            />
            </div>
            </Typography>
            <button onClick={handleClose}> cancel </button>
            <button onClick={() => handleSave(question, answers)}> save </button>
        </div>
    </Modal>
    )
}

export default withStyles(styles)(QuestionModal);