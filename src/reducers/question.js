import { GET_QUESTIONS, INCREASE_VOTE_COUNT, RESET_VOTE_COUNT } from "../actions/question";

const initialState = {
  questions: [],
  voteCount: 0,
  currentQuestion: null
};

export default function question(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case INCREASE_VOTE_COUNT:
      return { ...state, voteCount: state.voteCount + 1 };
    case RESET_VOTE_COUNT:
      return { ...state, voteCount: 0 };
    default:
      return state;
  }
}
