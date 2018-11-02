import { combineReducers } from "redux";
import answer from "./reducers/answer";
import user from "./reducers/user";

const rootReducer = combineReducers({ answer, user });
export default rootReducer;
