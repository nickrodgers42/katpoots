import React from "react";
import { withStyles, Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      background: "000"
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    save: {
        backgroundColor: "#99fd00"
    },

    cancel: {
        backgroundColor: "#FFEB3B"
    },

    delete: {
        backgroundColor: "#E53935"
    },

    button: {
        marginRight: 10,
        marginTop: 10,
    },
});

const QuestionModal = props =>{
    const {handleClose, open, classes, question, handleChange, answers, handleSave, handleChangeAnswer, handleCheck} = props;
    return(
    <Modal open={open} >
        <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
            <div>
            <TextField
                label="Question Title"
                defaultValue = {question ? question.questionText: null}
                onChange={handleChange(question)}
            />
            </div>
            </Typography>
            <Typography variant="subtitle1">
            <div>
            <TextField
                required
                label="Answer 1"
                defaultValue = {answers[0] ? answers[0].answerText: null}
                onChange={handleChangeAnswer(0)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(0)}
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
                onChange={handleChangeAnswer(1)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(1)}
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
                onChange={handleChangeAnswer(2)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={handleCheck(2)}
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
                onChange={handleChangeAnswer(3)}
            />
            <FormControlLabel
                control={<Checkbox
                    onChange={answers[3] ? handleCheck(3):null}
                    defaultChecked={answers[3] ? answers[3].correctAnswer: false}
                />
                }
                label="Correct?"
            />
            </div>
            </Typography>
            <Button className={[classes.save, classes.button]} onClick={() => handleSave(question, answers)}> save </Button>
            <Button className={[classes.delete, classes.button]}>Delete</Button>
            <Button className={[classes.cancel, classes.button]} onClick={handleClose}> Cancel Edit </Button>
        </div>
    </Modal>
    )
}

export default withStyles(styles)(QuestionModal);