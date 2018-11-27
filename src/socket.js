import { voteCounted, resetVotes, fetchQuestions } from "./actions/question";
import { goToNextQuestion, updateQuestionStatus } from "./actions/quiz";
import { fetchAllAnswers } from "./actions/answer";

const setupSocket = dispatch => {
  const socket = new WebSocket("ws://localhost:8989");

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "USER_JOINED":
      case "VALID_PIN":
        dispatch(data);
        break;
      case "VOTE_COUNTED":
        dispatch(voteCounted());
        break;
      case "RESET_VOTES":
        dispatch(resetVotes());
        break;
      case "GO_TO_NEXT_QUESTION":
        dispatch(goToNextQuestion(data.index));
        break;
      case "UPDATE_QUESTION_STATUS":
        dispatch(updateQuestionStatus(data.closeQuestion));
        break;
      case "REFRESH_QUESTIONS":
        dispatch(fetchQuestions(data.quizId));
        break;
      case "REFRESH_ANSWERS":
        dispatch(fetchAllAnswers(data.questionId));
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
