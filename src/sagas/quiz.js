import { takeEvery } from "redux-saga/effects";
import { NEXT_QUESTION, ADD_USER } from "../actions/quiz";

export default function* handleNextQuestion(params) {
  yield takeEvery(NEXT_QUESTION, action => {
    params.socket.send(JSON.stringify(action));
  });

  yield takeEvery(ADD_USER, action => {
    params.socket.send(JSON.stringify(action));
  });
}
