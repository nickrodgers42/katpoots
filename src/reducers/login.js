import { LOGIN_REQUEST, LOGIN_RESPONSE } from "../actions/login";
import { REGISTER_REQUEST, REGISTER_RESPONSE } from "../actions/register";

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_RESPONSE:
    case REGISTER_RESPONSE:
      return action.user;
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    default:
      return state;
  }
}
