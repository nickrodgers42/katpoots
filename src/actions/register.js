import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
function register(values) {
  return { type: REGISTER_REQUEST, values };
}

export const REGISTER_RESPONSE = "REGISTER_RESPONSE";
function response(user) {
  return {
    type: REGISTER_RESPONSE,
    user
  };
}

export function registerUser(values, history) {
  return dispatch => {
    dispatch(register(values));
    return axios
      .post(`/api/register`, values)
      .then(res => res.data)
      .then(answer => dispatch(response(answer)))
      .then(() => history.push("/"));
  };
}
