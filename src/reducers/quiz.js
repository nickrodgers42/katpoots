import {
  GET_QUIZZES,
  // NEXT_QUESTION,
  GO_TO_NEXT_QUESTION,
  GET_QUESTION_INDEX,
  INCREMENT_QUESTION,
  RESET_INDEX,
  USER_JOINED,
  SET_QUIZ,
  QUESTION_STATUS,
  CHANGE_QUESTION_STATUS,
  UPDATE_QUESTION_STATUS
} from "../actions/quiz";

import {
  UPDATE_STUDENTS
} from "../actions/student";

// We need to set an initial state while we wait for the response or we will get errors
const initialState = {
  quizzes: [],
  activeStep: -1,
  users: [],
  closeQuestion: null,
  currentQuiz: {
    _id: null
  }
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case GET_QUIZZES:
      // This will set the returned quizzes to the state as quiz.quizzes
      // Because of something called "reducer composition" we are only dealing with the quiz section of the state
      // This is why we don't need to worry about anything other than returning what we get
      // So no spread operator or anything else to maintain the rest of the state
      return { quizzes: action.quizzes };
    case GET_QUESTION_INDEX:
    case INCREMENT_QUESTION:
    case RESET_INDEX:
    case GO_TO_NEXT_QUESTION:
      return {
        ...state,
        activeStep: action.index
      };
    case UPDATE_STUDENTS:
      return {
        ...state,
        users: action.students
      }
    case USER_JOINED:
      return {
        ...state,
        users: [...state.users, action.student]
      };
    case SET_QUIZ:
      return {
        ...state,
        currentQuiz: action.quiz
      };
    case QUESTION_STATUS:
    case CHANGE_QUESTION_STATUS:
    case UPDATE_QUESTION_STATUS:
      return {
        ...state,
        closeQuestion: action.closeQuestion
      };
    default:
      return state;
  }
}
