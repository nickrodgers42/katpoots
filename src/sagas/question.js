import { takeEvery } from "redux-saga/effects";
import { INCREASE_VOTE_COUNT, RESET_VOTE_COUNT } from "../actions/question";

function send(socket, action) {
  socket.send(JSON.stringify(action));
}

export default function* handleVote({ socket }) {
  yield takeEvery(INCREASE_VOTE_COUNT, action => {
    send(socket, action);
  });
  yield takeEvery(RESET_VOTE_COUNT, action => {
    send(socket, action);
  });
}
