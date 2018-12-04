import { LOGIN_REQUEST, LOGIN_RESPONSE } from "../actions/login";
import { REGISTER_REQUEST, REGISTER_RESPONSE } from "../actions/register";
import { CHECK_FOR_USER, USER_RESPONSE, USER_LOGGED_OUT } from "../actions/user";
import { ADD_USER } from "../actions/quiz";
import { INCREASE_STUDENT_SCORE } from "../actions/student";

export default function user(state = {}, action) {
  switch (action.type) {
    case INCREASE_STUDENT_SCORE:
      return {
        ...state,
        score: action.score
      }
    case ADD_USER:
      return action.student;
    case LOGIN_RESPONSE:
    case REGISTER_RESPONSE:
    case USER_RESPONSE:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    case CHECK_FOR_USER:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    default:
      return state;
  }
}
