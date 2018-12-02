import axios from "axios";

export const INCREASE_STUDENT_SCORE = "INCREASE_STUDENT_SCORE";

export const increaseScore = (id, newScore) => dispatch =>{
    const student = {
        score: newScore
    }
    axios.put(`/api/student/${id}`, student).then(res =>
        dispatch({
            type: INCREASE_STUDENT_SCORE,
            score: res.data.score
        })
    );
};