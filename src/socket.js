import { voteCounted, resetVotes } from "./actions/question";
import { goToNextQuestion } from "./actions/quiz";

const setupSocket = dispatch => {
  const socket = new WebSocket("ws://localhost:8989");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "ADD_USER"
      })
    );
  };

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "VOTE_COUNTED":
        dispatch(voteCounted());
        break;
      case "RESET_VOTES":
        dispatch(resetVotes());
        break;
      case "GO_TO_NEXT_QUESTION":
        dispatch(goToNextQuestion(data.index));
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
