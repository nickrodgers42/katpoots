import { REQUEST_ANSWER, GET_ANSWER, GET_ALL_ANSWERS, ADD_ANSWER } from "../actions/answer";

export default function answer(state = {}, action) {
  switch (action.type) {
    case GET_ANSWER:
      return action.answer;
    case GET_ALL_ANSWERS:
      return { ...state, answers: action.answers };
    case ADD_ANSWER:
      return{ ...state, answers: [action.payload, ...state.answers]};
    case REQUEST_ANSWER:
    default:
      return state;
  }
}
