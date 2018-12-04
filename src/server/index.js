require("@babel/polyfill");
const socket = require("socket.io");

export default class WS {
  constructor(server) {
    const io = socket(server);
    this.io = io;
    io.on("connection", socket => {
      console.log("Client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    io.on("ADD_USER", message => {
      const data = JSON.parse(message);
      console.log(data);
      io.emit({ type: "USER_JOINED", student: data.student });
    });

    io.on("INCREASE_VOTE_COUNT", message => {
      const data = JSON.parse(message);
      io.emit({ type: "VOTE_COUNTED" });
    });

    io.on("RESET_VOTE_COUNT", message => {
      const data = JSON.parse(message);
      io.emit({ type: "RESET_VOTES" });
    });

    io.on("NEXT_QUESTION", message => {
      const data = JSON.parse(message);
      io.emit({ type: "GO_TO_NEXT_QUESTION", index: data.index });
    });

    io.on("CHANGE_QUESTION_STATUS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "UPDATE_QUESTION_STATUS", closeQuestion: data.closeQuestion });
    });

    io.on("UPDATE_QUESTIONS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "REFRESH_QUESTIONS", quizId: data.quizId });
    });

    io.on("UPDATE_ANSWERS", message => {
      const data = JSON.parse(message);
      io.emit({ type: "REFRESH_ANSWERS", questionId: data.questionId });
    });
  }
}
