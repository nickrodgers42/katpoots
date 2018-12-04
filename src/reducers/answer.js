import { REQUEST_ANSWER, GET_ANSWER, GET_ALL_ANSWERS, ADD_ANSWER, UPDATE_ANSWERS, ANSWERS_LOADING } from "../actions/answer";

const initialState = {
  loadingAnswers: true
}

export default function answer(state = {}, action) {
  switch (action.type) {
    case GET_ANSWER:
      return action.answer;
    case GET_ALL_ANSWERS:
    case UPDATE_ANSWERS:
      return { ...state, answers: action.answers, loadingAnswers: false };
    case ADD_ANSWER:
      return{ ...state, answers: [action.payload, ...state.answers]};
    case ANSWERS_LOADING:
      return{ ...state, loadingAnswers:true}
    case REQUEST_ANSWER:
    default:
      return state;
  }
}
