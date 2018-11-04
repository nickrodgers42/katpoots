import { combineReducers } from "redux";
import answer from "./reducers/answer";
import user from "./reducers/user";
import quiz from "./reducers/quiz";

// This is the reducer composition I mentioned elsewhere
const rootReducer = combineReducers({ answer, user, quiz });
export default rootReducer;
