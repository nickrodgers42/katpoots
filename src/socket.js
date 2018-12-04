import { voteCounted, resetVotes, fetchQuestions } from "./actions/question";
import { goToNextQuestion, updateQuestionStatus, userJoined } from "./actions/quiz";
import { fetchAllAnswers } from "./actions/answer";
import io from "socket.io-client";

const setupSocket = dispatch => {
  console.log("here");
  const socket = io();

  socket.on("test", event => console.log(event));

  socket.on("user joined", event => {
    console.log(event);
    dispatch(userJoined(event));
  });

  socket.on("vote counted", () => {
    console.log("here");
    dispatch(voteCounted());
  });

  socket.on("reset votes", () => {
    dispatch(resetVotes());
  });

  socket.on("go to next question", event => {
    dispatch(goToNextQuestion(event));
  });

  socket.on("update question status", event => {
    dispatch(updateQuestionStatus(event));
  });

  socket.on("refresh questions", event => {
    dispatch(fetchQuestions(event));
  });

  socket.on("refresh answers", event => {
    dispatch(fetchAllAnswers(event));
  });

  return socket;
};

export default setupSocket;
