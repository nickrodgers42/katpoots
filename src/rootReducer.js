import { combineReducers } from "redux";
import answer from "./reducers/answer";
import user from "./reducers/user";
import quiz from "./reducers/quiz";
import question from "./reducers/question";

// This is the reducer composition I mentioned elsewhere
// It makes it so that each reducer is only in charge of it's own section of the state
// That section will be called whatever we import it as or key it by here
const rootReducer = combineReducers({ answer, user, quiz, question });
export default rootReducer;
