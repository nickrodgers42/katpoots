import React from "react";
import { withStyles } from "@material-ui/core";
import QuizLink from "./quizLink"

const styles = theme => ({

})

const testData = {
    quizname: "Quiz Title"
};

const QuizList = props => {
    const {classes} = props;
    return (
        <div>
            <QuizLink quizname = {testData.quizname}/>
        </div>
    )
}

export default withStyles(styles)(QuizList)