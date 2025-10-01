const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_TODOS_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOAD_TODOS_SUCCESS":
      return { ...state, loading: false, todos: action.payload };
    case "LOAD_TODOS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ADD_TODO_REQUEST":
      return { ...state, loading: true };
    case "ADD_TODO_SUCCESS":
      return { ...state, loading: false, todos: [...state.todos, action.payload] };
    case "ADD_TODO_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "REMOVE_TODO_SUCCESS":
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };

    case "TOGGLE_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "EDIT_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        ),
      };

    case "CLEAR_TODOS_SUCCESS":
      return { ...state, todos: [] };

    default:
      return state;
  }
}
