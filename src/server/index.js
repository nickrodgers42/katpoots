require("@babel/polyfill");
import WebSocket from "ws";
import { loadModels } from "../data/models";

const wss = new WebSocket.Server({ port: 8989 });

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", async ws => {
  ws.on("message", async message => {
    const models = await loadModels();
    const data = JSON.parse(message);
    let quiz;
    let student;
    switch (data.type) {
      case "START_QUIZ":
        quiz = await models.quiz.findById(data.quizId);
        return ws.send({ type: "QUIZ_STARTED", pin: quiz.pin });
      case "ADD_USER":
        const { pin, displayName } = data;
        quiz = await models.quiz.findOne({ pin: Number(pin) });
        student = await new models.student({
          displayName
        }).save();
        return broadcast({ type: "USER_JOINED", student });
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
