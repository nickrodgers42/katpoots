import { REGISTER_REQUEST, REGISTER_RESPONSE } from "../actions/register";

export default function register(state = {}, action) {
  switch (action.type) {
    case REGISTER_RESPONSE:
      return action.user;
    case REGISTER_REQUEST:
    default:
      return state;
  }
}
