import axios from "axios";

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
  console.log(answers);
  return {type: GET_ALL_ANSWERS, answers};
}

// export const VOTE = "VOTE";
// function vote(answerId) {
//   return dispatch => {
//     return axios
//       .put()
//   }
// }

export function fetchAllAnswers(quizId){
  return dispatch => {
    return axios
      .get(`/api/allAnswers/${quizId}`)
      .then(res => res.data)
      .then(answers => dispatch(getAllAnswers(answers)));
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
