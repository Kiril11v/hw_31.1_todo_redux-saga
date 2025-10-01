import { put, takeEvery, delay, select } from "redux-saga/effects";
import {
  loadTodosSuccess, loadTodosFailure,
  addTodoSuccess, addTodoFailure,
  removeTodoSuccess,
  toggleTodoSuccess,
  editTodoSuccess,
  clearTodosSuccess,
} from "./todoActions";

// 🔹 Вспомогательные функции работы с localStorage
const STORAGE_KEY = "my_todos";

const saveToLocalStorage = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// SELECTOR для получения state
const getTodos = (state) => state.todos.todos;

// LOAD
function* loadTodosSaga() {
  try {
    yield delay(400);
    const todos = loadFromLocalStorage();
    yield put(loadTodosSuccess(todos));
  } catch (e) {
    yield put(loadTodosFailure("Не вдалося завантажити"));
  }
}

// ADD
function* addTodoSaga(action) {
  try {
    yield delay(300);
    const newTodo = { id: Date.now(), text: action.payload, completed: false };
    yield put(addTodoSuccess(newTodo));

    const todos = yield select(getTodos);
    saveToLocalStorage([...todos, newTodo]);
  } catch (e) {
    yield put(addTodoFailure("Не вдалося додати"));
  }
}

// REMOVE
function* removeTodoSaga(action) {
  yield delay(200);
  yield put(removeTodoSuccess(action.payload));

  const todos = yield select(getTodos);
  saveToLocalStorage(todos.filter((t) => t.id !== action.payload));
}

// TOGGLE
function* toggleTodoSaga(action) {
  yield delay(150);
  yield put(toggleTodoSuccess(action.payload));

  const todos = yield select(getTodos);
  saveToLocalStorage(todos);
}

// EDIT
function* editTodoSaga(action) {
  yield delay(200);
  yield put(editTodoSuccess(action.payload.id, action.payload.text));

  const todos = yield select(getTodos);
  saveToLocalStorage(todos);
}

// CLEAR
function* clearTodosSaga() {
  yield delay(200);
  yield put(clearTodosSuccess());
  saveToLocalStorage([]);
}

export default function* watchTodos() {
  yield takeEvery("LOAD_TODOS_REQUEST", loadTodosSaga);
  yield takeEvery("ADD_TODO_REQUEST", addTodoSaga);
  yield takeEvery("REMOVE_TODO_REQUEST", removeTodoSaga);
  yield takeEvery("TOGGLE_TODO_REQUEST", toggleTodoSaga);
  yield takeEvery("EDIT_TODO_REQUEST", editTodoSaga);
  yield takeEvery("CLEAR_TODOS_REQUEST", clearTodosSaga);
}
