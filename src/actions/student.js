import axios from "axios";

export const INCREASE_STUDENT_SCORE = "INCREASE_STUDENT_SCORE";
export const DELETED_STUDENTS = "DELETED_STUDENTS";

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

export const UPDATE_STUDENTS = "UPDATE_STUDENTS";
function updateStudents(students){
    return {type: UPDATE_STUDENTS, students};
}

export function fetchStudents(quizId){
    return dispatch => {
        return axios
            .get(`/api/allStudents/${quizId}`)
            .then(res => res.data)
            .then(students => dispatch(updateStudents(students)));
    }
}

export function deleteStudents(quizId){
    return dispatch => {
        return axios
            .delete(`/api/allStudents/${quizId}`)
            .then(() =>
                dispatch({
                    type: DELETED_STUDENTS
                })
            );
    }
}