import axios from "axios";

export const ANSWERS_LOADING = "ANSWERS_LOADING";
export const setAnswersLoading = () => {
  return {
    type: ANSWERS_LOADING
  }
}

export const REQUEST_ANSWER = "REQUEST_ANSWER";
function requestAnswer(answerId) {
  return { type: REQUEST_ANSWER, answerId };
}

export const GET_ANSWER = "GET_ANSWER";
function getAnswer(answer) {
  return {
    type: GET_ANSWER,
    answer
  };
}

export const GET_ALL_ANSWERS = "GET_ALL_ANSWERS";
function getAllAnswers(answers){
  return {type: GET_ALL_ANSWERS, answers};
}

export const UPDATE_ANSWERS = "UPDATE_ANSWERS";
function updateAnswers(answers, questionId){
  return {type: UPDATE_ANSWERS, answers, questionId}
}

export const EDIT_ANSWER = "EDIT_ANSWER";
export const editAnswer = (answer, answerId) => dispatch => {
  axios
    .put(`/api/answer/${answerId}`, answer)
    .then(res =>
      dispatch({
        type: EDIT_ANSWER,
        payload: res.data
      })
    )
};

 const DELETE_ANSWER = "DELETE_ANSWER";
 export const deleteAnswer = (answerId, question) => dispatch => {
   axios
    .delete(`/api/answer/${answerId}`)
    .then(() =>
      dispatch({
        type: DELETE_ANSWER,
        answerId
      })
    )
    .then(() => dispatch(fetchAllAnswers(question._id)));
 }


export const ADD_ANSWER = "ADD_ANSWER";
export const addAnswer = (answer, questionId) => dispatch => {
  axios
    .post(`/api/answer/${questionId}`, answer)
    .then(res =>
      dispatch({
        type: ADD_ANSWER,
        payload: res.data
      })
    )
}

// export const VOTE = "VOTE";
// function vote(answerId) {
//   return dispatch => {
//     return axios
//       .put()
//   }
// }

export function fetchAllAnswers(questionId){
  return dispatch => {
    dispatch(setAnswersLoading());
    return axios
      .get(`/api/allAnswers/${questionId}`)
      .then(res => res.data)
      .then(answers => dispatch(getAllAnswers(answers)));
  };
}

export function updateAllAnswers(questionId){
  return dispatch => {
    dispatch(setAnswersLoading());
    return axios
      .get(`/api/allAnswers/${questionId}`)
      .then(res => res.data)
      .then(answers => dispatch(updateAnswers(answers, questionId)));
  };
}

function fetchAnswer(answerId) {
  return dispatch => {
    dispatch(requestAnswer(answerId));
    return axios
      .get(`/api/answer/${answerId}`)
      .then(res => res.data)
      .then(answer => dispatch(getAnswer(answer)));
  };
}

function shouldFetchAnswer(state, answerId) {
  const answer = state.answer;
  if (!answer.id !== answerId) {
    return true;
  } else if (answer.isFetching) {
    return false;
  }
}

export function fetchAnswerIfNeeded(answerId) {
  return (dispatch, getState) => {
    if (shouldFetchAnswer(getState(), answerId)) return dispatch(fetchAnswer(answerId));
  };
}