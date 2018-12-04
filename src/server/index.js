require("@babel/polyfill");
import WebSocket from "ws";

const wss = new WebSocket.Server({ port: process.env.PORT || 8989 });

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", ws => {
  ws.on("message", message => {
    const data = JSON.parse(message);
    console.log(data);
    switch (data.type) {
      case "ADD_USER":
        return broadcast({ type: "USER_JOINED", student: data.student });
      case "INCREASE_VOTE_COUNT":
        return broadcast({ type: "VOTE_COUNTED" }, ws);
      case "RESET_VOTE_COUNT":
        return broadcast({ type: "RESET_VOTES" }, ws);
      case "NEXT_QUESTION":
        broadcast({ type: "GO_TO_NEXT_QUESTION", index: data.index }, ws);
        break;
      case "CHANGE_QUESTION_STATUS":
        broadcast({ type: "UPDATE_QUESTION_STATUS", closeQuestion: data.closeQuestion }, ws);
        break;
      case "UPDATE_QUESTIONS":
        broadcast({ type: "REFRESH_QUESTIONS", quizId: data.quizId }, ws);
        break;
      case "UPDATE_ANSWERS":
        broadcast({ type: "REFRESH_ANSWERS", questionId: data.questionId }, ws);
      default:
        break;
    }
  });

  ws.on("close", () => {
    broadcast(
      {
        type: "REMOVE_USER"
      },
      ws
    );
  });
});
