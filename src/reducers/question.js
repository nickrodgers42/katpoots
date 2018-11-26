import { GET_QUESTIONS, INCREASE_VOTE_COUNT, RESET_VOTE_COUNT, VOTE_COUNTED, RESET_VOTES, UPDATE_QUESTIONS, QUESTIONS_LOADING } from "../actions/question";

const initialState = {
  questions: [],
  voteCount: 0,
  loadingQuestions: true
};

export default function question(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions, loadingQuestions: false };
    case INCREASE_VOTE_COUNT:
    case VOTE_COUNTED:
      return { ...state, voteCount: state.voteCount + 1 };
    case RESET_VOTE_COUNT:
    case RESET_VOTES:
      return { ...state, voteCount: 0, loadingQuestions:true };
    case QUESTIONS_LOADING:
      return { ...state, loadingQuestions: true }
    default:
      return state;
  }
}
