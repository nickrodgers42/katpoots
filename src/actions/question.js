import axios from "axios";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const INCREASE_VOTE_COUNT = "INCREASE_VOTE_COUNT";
export const RESET_VOTE_COUNT = "RESET_VOTE_COUNT";

function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

const EDIT_QUESTION = "EDIT_QUESTION";

export const editQuestion = (newQuestion, questionId, quizId) => dispatch => {
  axios
    .put(`/api/question/${questionId}`, newQuestion)
    .then(res =>
      dispatch({
        type:EDIT_QUESTION,
        quiz: res.data
      })
    )

    .then(() => dispatch(fetchQuestions(quizId)));
};

export const increaseVoteCount = () => dispatch => dispatch({ type: INCREASE_VOTE_COUNT });
export const resetVoteCount = () => dispatch => dispatch({ type: RESET_VOTE_COUNT });

export function fetchQuestions(quizId) {
  return dispatch => {
    return axios
      .get(`/api/questions/${quizId}`)
      .then(res => res.data)
      .then(questions => dispatch(getQuestions(questions)));
  };
}
