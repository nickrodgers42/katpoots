import { takeEvery } from "redux-saga/effects";
import { INCREASE_VOTE_COUNT, RESET_VOTE_COUNT, UPDATE_QUESTIONS } from "../actions/question";

export default function* handleVote(params) {
  yield takeEvery(INCREASE_VOTE_COUNT, action => {
    params.socket.emit("increase vote count", JSON.stringify(action));
  });

  yield takeEvery(RESET_VOTE_COUNT, action => {
    params.socket.emit("reset vote count", JSON.stringify(action));
  });

  yield takeEvery(UPDATE_QUESTIONS, action => {
    params.socket.emit("update questions", JSON.stringify(action));
  });
}
