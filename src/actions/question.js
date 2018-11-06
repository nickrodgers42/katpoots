import axios from "axios";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const INCREASE_VOTE_COUNT = "INCREASE_VOTE_COUNT";
export const RESET_VOTE_COUNT = "RESET_VOTE_COUNT";
export const VOTE_COUNTED = "VOTE_COUNTED";
export const RESET_VOTES = "RESET_VOTES";

function getQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

export const increaseVoteCount = () => dispatch => dispatch({ type: INCREASE_VOTE_COUNT });
export const resetVoteCount = () => dispatch => dispatch({ type: RESET_VOTE_COUNT });
export const voteCounted = () => dispatch => dispatch({ type: VOTE_COUNTED });
export const resetVotes = () => dispatch => dispatch({ type: RESET_VOTES });

export function fetchQuestions(quizId) {
  return dispatch => {
    return axios
      .get(`/api/questions/${quizId}`)
      .then(res => res.data)
      .then(questions => dispatch(getQuestions(questions)));
  };
}
