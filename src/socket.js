import { voteCounted, resetVotes, fetchQuestions } from "./actions/question";
import { goToNextQuestion, updateQuestionStatus, userJoined } from "./actions/quiz";
import { fetchAllAnswers } from "./actions/answer";
import io from "socket.io-client";

const setupSocket = dispatch => {
  const socket = io();
  socket.on("USER_JOINED", event => {
    const data = JSON.parse(event.data);
    dispatch(userJoined(data.student));
  });

  socket.on("VOTE_COUNTED", () => {
    dispatch(voteCounted());
  });

  socket.on("RESET_VOTES", () => {
    dispatch(resetVotes());
  });

  socket.on("GO_TO_NEXT_QUESTION", event => {
    const data = JSON.parse(event.data);
    dispatch(goToNextQuestion(data.index));
  });

  socket.on("UPDATE_QUESTION_STATUS", event => {
    const data = JSON.parse(event.data);
    dispatch(updateQuestionStatus(data.closeQuestion));
  });

  socket.on("REFRESH_QUESTIONS", event => {
    const data = JSON.parse(event.data);
    dispatch(fetchQuestions(data.quizId));
  });

  socket.on("REFRESH_ANSWERS", event => {
    const data = JSON.parse(event.data);
    dispatch(fetchAllAnswers(data.questionId));
  });

  return socket;
};

export default setupSocket;
