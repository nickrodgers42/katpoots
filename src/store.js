import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import quiz from "./sagas/quiz";
import question from "./sagas/question";
import answer from "./sagas/answer";
import setupSocket from "./socket";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware), applyMiddleware(sagaMiddleware))
  );
  const socket = setupSocket(store.dispatch);
  console.log(socket.emit);
  sagaMiddleware.run(quiz, { socket });
  sagaMiddleware.run(question, { socket });
  sagaMiddleware.run(answer, { socket });
  return store;
}
