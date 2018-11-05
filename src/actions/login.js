import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
function login(values) {
  return { type: LOGIN_REQUEST, values };
}

export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
function response(user) {
  return { type: LOGIN_RESPONSE, user };
}

export function loginUser(values, history) {
  return dispatch => {
    dispatch(login(values));
    return axios
      .post(`/api/login`, values)
      .then(res => res.data)
      .then(user => dispatch(response(user)))
      .then(() => history.push("/user"));
  };
}
