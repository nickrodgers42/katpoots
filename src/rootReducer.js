import { combineReducers } from "redux";
import answer from "./reducers/answer";
import register from "./reducers/register";

const rootReducer = combineReducers({ answer, register });
export default rootReducer;
