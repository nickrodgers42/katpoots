import { takeEvery } from "redux-saga/effects";
import { NEXT_QUESTION, ADD_USER, CHANGE_QUESTION_STATUS } from "../actions/quiz";

export default function* handleNextQuestion(params) {
  console.log("in saga");
  yield takeEvery(NEXT_QUESTION, action => {
    params.socket.emit("next question", JSON.stringify(action));
  });

  yield takeEvery(ADD_USER, action => {
    console.log(params, action);
    params.socket.emit("add user", JSON.stringify(action));
  });

  yield takeEvery(CHANGE_QUESTION_STATUS, action => {
    params.socket.emit("change question status", JSON.stringify(action));
  });
}
