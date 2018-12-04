import { GET_QUESTIONS, INCREASE_VOTE_COUNT, RESET_VOTE_COUNT, VOTE_COUNTED, RESET_VOTES, UPDATE_QUESTIONS, QUESTIONS_LOADING } from "../actions/question";

const initialState = {
  questions: [],
  voteCount: 0,
  loadingQuestions: true,
  answersVotedOn: {}
};

export default function question(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions, loadingQuestions: false };
    case INCREASE_VOTE_COUNT:
    case VOTE_COUNTED:
      let newAnswersVotedOn = {...state.answersVotedOn}
      if (action.answer._id in state.answersVotedOn){
        newAnswersVotedOn[action.answer._id] = state.answersVotedOn[action.answer._id] + 1;
      }
      else{
        newAnswersVotedOn[action.answer._id] = 1;
      }
      return { ...state, voteCount: state.voteCount + 1, answersVotedOn: newAnswersVotedOn }
    case RESET_VOTE_COUNT:
    case RESET_VOTES:
      return { ...state, voteCount: 0, loadingQuestions:true };
    case QUESTIONS_LOADING:
      return { ...state, loadingQuestions: true }
    default:
      return state;
  }
}
