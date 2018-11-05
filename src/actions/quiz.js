import axios from "axios";

// This is the action's type, the reducer uses this to know how to change the state
// We export it here so that we can use it in the reducer
export const GET_QUIZZES = "GET_QUIZZES";

// We don't need to export these because they don't have any side-effects
// Because we will dispatch ge fetchQuizzes action after to update the state
// So there isn't anything for the reducer to do
const DELETE_QUIZ = "DELETE_QUIZ";
const ADD_QUIZ = "ADD_QUIZ";
const EDIT_QUIZ = "EDIT_QUIZ";

export const editQuiz = (id) => dispatch => {
  let title = prompt('New Quiz Name?');
  const quiz = {
    title
  }
  axios
    .put(`/api/quiz/${id}`, quiz)
    .then(res =>
      dispatch({
        type: EDIT_QUIZ,
        quiz: res.data
      })
    )

    .then(() => dispatch(fetchQuizzes()));
};

// This is what we dispatch internally to this file's actions
function getQuizzes(quizzes) {
  return { type: GET_QUIZZES, quizzes };
}

export const deleteQuiz = id => dispatch => {
  axios
    .delete(`/api/quiz/${id}`)
    // This way is also acceptable rather than splitting things like the get/fetch quizzes approach
    .then(() =>
      dispatch({
        type: DELETE_QUIZ,
        id
      })
    )
    // Dispatch action to get updated list of quizzes
    // Otherwise the deleted quiz would still appear
    .then(() => dispatch(fetchQuizzes()));
};

export const addQuiz = quiz => dispatch => {
  axios
    .post(`/api/quiz`, quiz)
    .then(res =>
      dispatch({
        type: ADD_QUIZ, // Even though we don't use it in the reducer
        // We still return this so that we can see what happened in redux
        quiz: res.data
      })
    )
    .then(() => dispatch(fetchQuizzes()));
};

// This is what we will import into the component to dispatch from the front end
export function fetchQuizzes() {
  return dispatch => {
    return (
      axios
        .get(`/api/quizzes`)
        .then(res => res.data)
        // We dispatch the internal action which will result in a state change
        .then(quizzes => dispatch(getQuizzes(quizzes)))
    );
  };
}
