import { REQUEST_ANSWER, GET_ANSWER } from "../actions/answer";

export default function answer(state = {}, action) {
  switch (action.type) {
    case GET_ANSWER:
      return action.answer;
    case REQUEST_ANSWER:
    default:
      return state;
  }
}
