import axios from "axios";

export const CHECK_FOR_USER = "CHECK_FOR_USER";
function getUser() {
  return { type: CHECK_FOR_USER };
}

export const USER_RESPONSE = "USER_RESPONSE";
function response(user) {
  return { type: USER_RESPONSE, user };
}

export const LOG_OUT_USER = "LOG_OUT_USER";
function logout() {
  return { type: LOG_OUT_USER };
}

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
function logoutResponse() {
  return { type: USER_LOGGED_OUT };
}

export function checkForUser() {
  return dispatch => {
    dispatch(getUser());
    return axios
      .get(`/api/user`)
      .then(res => res.data)
      .then(user => dispatch(response(user)));
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout());
    return axios.get(`/api/logout`).then(() => dispatch(response(logoutResponse)));
  };
}
