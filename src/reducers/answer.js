import { REQUEST_ANSWER, GET_ANSWER, GET_ALL_ANSWERS } from "../actions/answer";

export default function answer(state = {}, action) {
  switch (action.type) {
    case GET_ANSWER:
      return action.answer;
    case GET_ALL_ANSWERS:
      return { ...state, answers: action.answers };
    case REQUEST_ANSWER:
    default:
      return state;
  }
}
