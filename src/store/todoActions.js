/*
  type: "ТИП_СОБЫТИЯ",
  payload: ДАННЫЕ
*/

// ADD
export const addTodoRequest = (text) => ({
  type: "ADD_TODO_REQUEST",
  payload: text,
});
export const addTodoSuccess = (todo) => ({
  type: "ADD_TODO_SUCCESS",
  payload: todo,
});
export const addTodoFailure = (error) => ({
  type: "ADD_TODO_FAILURE",
  payload: error,
});

// LOAD
export const loadTodosRequest = () => 
  ({ type: "LOAD_TODOS_REQUEST" 
});
export const loadTodosSuccess = (todos) => 
  ({ type: "LOAD_TODOS_SUCCESS",
  payload: todos
});
export const loadTodosFailure = (error) => 
  ({ type: "LOAD_TODOS_FAILURE",
  payload: error
});

// REMOVE
export const removeTodoRequest = (id) => ({
  type: "REMOVE_TODO_REQUEST",
  payload: id
});
export const removeTodoSuccess = (id) => ({
  type: "REMOVE_TODO_SUCCESS",
  payload: id 
});

// TOGGLE
export const toggleTodoRequest = (id) => ({
  type: "TOGGLE_TODO_REQUEST",
  payload: id
});
export const toggleTodoSuccess = (id) => ({
  type: "TOGGLE_TODO_SUCCESS",
  payload: id
});

//EDIT
export const editTodoRequest = (id, text) =>
  ({ type: "EDIT_TODO_REQUEST",
  payload: { id, text }
})
export const editTodoSuccess = (id, text) =>
  ({ type: "EDIT_TODO_SUCCESS",
  payload: { id, text }
})

//CLEAR
export const clearTodosRequest = () => ({ 
  type: "CLEAR_TODOS_REQUEST" });
export const clearTodosSuccess = () => ({ 
  type: "CLEAR_TODOS_SUCCESS" });