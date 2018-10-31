import { combineReducers } from "redux";
import answer from "./reducers/answer";
import register from "./reducers/register";
import user from "./reducers/login";

const rootReducer = combineReducers({ answer, register, user });
export default rootReducer;
