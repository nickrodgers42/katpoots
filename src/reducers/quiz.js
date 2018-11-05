import { GET_QUIZZES, NEXT_QUESTION } from "../actions/quiz";

// We need to set an initial state while we wait for the response or we will get errors
const initialState = {
  quizzes: [],
  activeStep: 0
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case GET_QUIZZES:
      // This will set the returned quizzes to the state as quiz.quizzes
      // Because of something called "reducer composition" we are only dealing with the quiz section of the state
      // This is why we don't need to worry about anything other than returning what we get
      // So no spread operator or anything else to maintain the rest of the state
      return { quizzes: action.quizzes };
    case NEXT_QUESTION:
      return {
        ...state,
        activeStep: action.index
      };
    default:
      return state;
  }
}
