import axios from "axios";

// This is the action's type, the reducer uses this to know how to change the state
// We export it here so that we can use it in the reducer
export const GET_QUIZZES = "GET_QUIZZES";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const GO_TO_NEXT_QUESTION = "GO_TO_NEXT_QUESTION";
export const USER_JOINED = "USER_JOINED";
export const ADD_USER = "ADD_USER";
export const SET_QUIZ = "SET_QUIZ";
export const CHANGE_QUESTION_STATUS = "CHANGE_QUESTION_STATUS";
export const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";

// We don't need to export these because they don't have any side-effects
// Because we will dispatch ge fetchQuizzes action after to update the state
// So there isn't anything for the reducer to do
const DELETE_QUIZ = "DELETE_QUIZ";
const ADD_QUIZ = "ADD_QUIZ";
const EDIT_QUIZ = "EDIT_QUIZ";

export function setQuiz(quiz) {
  return dispatch =>
    dispatch({
      type: SET_QUIZ,
      quiz
    });
}

export function joinQuiz(values) {
  return dispatch =>
    dispatch({
      type: ADD_USER,
      quizId: values.pin,
      displayName: values.displayName
    });
}

export const GET_QUESTION_INDEX = "GET_QUESTION_INDEX";
export const getQuestionIndex = id => dispatch => {
  axios.get(`/api/quiz/${id}`).then(res =>
    dispatch({
      type: GET_QUESTION_INDEX,
      index: res.data.questionIndex
    })
  );
};

export const INCREMENT_QUESTION = "INCREMENT_QUESTION";
export const increment = (id, currentIndex) => dispatch => {
  let newIndex = currentIndex + 1;
  const quiz = {
    questionIndex: newIndex
  };
  axios.put(`/api/quiz/${id}`, quiz).then(res =>
    dispatch({
      type: INCREMENT_QUESTION,
      index: res.data.questionIndex
    })
  );
};

export const QUESTION_STATUS = "GET_QUESTION_STATUS";
export const questionClosed = (id, status) => dispatch => {
  let closed = status;
  const quiz = {
    closeQuestion: closed
  };
  axios.put(`/api/quiz/${id}`, quiz).then(res =>
    dispatch({
      type: QUESTION_STATUS,
      closeQuestion: res.data.closeQuestion
    })
  );
};

export const getQuestionStatus = id => dispatch => {
  axios.get(`/api/quiz/${id}`).then(res =>
    dispatch({
      type: QUESTION_STATUS,
      closeQuestion: res.data.closeQuestion
    })
  );
};

export const RESET_INDEX = "RESET_INDEX";
export const resetIndex = id => dispatch => {
  const quiz = {
    questionIndex: "0"
  };
  axios.put(`/api/quiz/${id}`, quiz).then(res =>
    dispatch({
      type: RESET_INDEX,
      index: res.data.questionIndex
    })
  );
};

export const editQuiz = id => dispatch => {
  let title = prompt("New Quiz Name?");
  if (title !== "") {
    const quiz = {
      title
    };
    axios
      .put(`/api/quiz/${id}`, quiz)
      .then(res =>
        dispatch({
          type: EDIT_QUIZ,
          quiz: res.data
        })
      )

      .then(() => dispatch(fetchQuizzes()));
  }
};

// This is what we dispatch internally to this file's actions
function getQuizzes(quizzes) {
  return { type: GET_QUIZZES, quizzes };
}

export const changeQuestionStatus = status => dispatch =>
  dispatch({
    type: CHANGE_QUESTION_STATUS,
    closeQuestion: status
  });

export const updateQuestionStatus = closeQuestion => dispatch =>
  dispatch({
    type: UPDATE_QUESTION_STATUS,
    closeQuestion
  });

export const nextQuestion = index => dispatch =>
  dispatch({
    type: NEXT_QUESTION,
    index: index + 1
  });

export const goToNextQuestion = index => dispatch =>
  dispatch({
    type: GO_TO_NEXT_QUESTION,
    index
  });

export const deleteQuiz = id => dispatch => {
  axios
    .delete(`/api/quiz/${id}`)
    // This way is also acceptable rather than splitting things like the get/fetch quizzes approach
    .then(() =>
      dispatch({
        type: DELETE_QUIZ,
        id
      })
    )
    // Dispatch action to get updated list of quizzes
    // Otherwise the deleted quiz would still appear
    .then(() => dispatch(fetchQuizzes()));
};

export const addQuiz = (quiz, userId) => dispatch => {
  axios
    .post(`/api/quiz/${userId}`, quiz)
    .then(res =>
      dispatch({
        type: ADD_QUIZ, // Even though we don't use it in the reducer
        // We still return this so that we can see what happened in redux
        quiz: res.data
      })
    )
    .then(() => dispatch(fetchQuizzes()));
};

// This is what we will import into the component to dispatch from the front end
export function fetchQuizzes() {
  return dispatch => {
    return (
      axios
        .get(`/api/quizzes`)
        .then(res => res.data)
        // We dispatch the internal action which will result in a state change
        .then(quizzes => dispatch(getQuizzes(quizzes)))
    );
  };
}
