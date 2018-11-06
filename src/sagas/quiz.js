import { takeEvery } from "redux-saga/effects";
import { NEXT_QUESTION } from "../actions/quiz";

export default function* handleNextQuestion(params) {
  yield takeEvery(NEXT_QUESTION, action => {
    params.socket.send(JSON.stringify(action));
  });
}
