import { takeEvery } from "redux-saga/effects";
import { UPDATE_ANSWERS } from "../actions/answer";

export default function* updateAllAnswers(params) {
  yield takeEvery(UPDATE_ANSWERS, action => {
    params.socket.emit("update answers", JSON.stringify(action));
  });
}
