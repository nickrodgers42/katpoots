import { takeEvery } from "redux-saga/effects";
import { NEXT_QUESTION, CHANGE_QUESTION_STATUS } from "../actions/quiz";

export default function* handleNextQuestion(params) {
  yield takeEvery(NEXT_QUESTION, action => {
    params.socket.send(JSON.stringify(action));
  });
  yield takeEvery(CHANGE_QUESTION_STATUS, action => {
    params.socket.send(JSON.stringify(action));
  });
}
