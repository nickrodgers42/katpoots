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

function fetchAnswer(answerId) {
  return dispatch => {
    dispatch(requestAnswer(answerId));
    return axios
      .get(`/api/answers/${answerId}`)
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
