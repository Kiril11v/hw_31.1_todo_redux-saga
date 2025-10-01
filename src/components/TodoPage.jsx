import { useTheme } from "../contexts/ThemeContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  loadTodosRequest,
  addTodoRequest,
  removeTodoRequest,
  toggleTodoRequest,
  editTodoRequest,
  clearTodosRequest,
} from "../store/todoActions";
import { useEffect, useState, useRef } from "react";

export default function TodoPage() {
  const { theme } = useTheme();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // для редактирования
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(loadTodosRequest());
  }, [dispatch]);

  const getThemeClass = (lightClass, darkClass) =>
    theme === "light" ? lightClass : darkClass;

  const validationSchema = Yup.object({
    task: Yup.string()
      .trim()
      .min(5, "Мінімум 5 символів"),
  });

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const submitEdit = () => {
    if (editText.trim()) {
      dispatch(editTodoRequest(editingId, editText));
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // фокус на input при редактировании
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  return (
    <div className="py-5 w-100">
      {/* Форма через Formik только для добавления */}
      <Formik
        initialValues={{ task: "" }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          dispatch(addTodoRequest(values.task));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mb-3 w-100">
            <div className="d-flex">
              <Field
                type="text"
                name="task"
                className={`${getThemeClass(
                  "form-control me-2",
                  "form-control bg-secondary text-light border-0 me-2"
                )} flex-grow-1`}
                placeholder="New task ..."
              />
              <button
                type="submit"
                className={`btn ms-2 ${getThemeClass(
                  "btn-dark text-white",
                  "btn-light text-dark"
                )}`}
                disabled={isSubmitting || loading}
              >
                {loading ? "..." : "Додати"}
              </button>
            </div>
            <ErrorMessage
              name="task"
              component="div"
              className="text-danger mt-1"
            />
          </Form>
        )}
      </Formik>

      {error && (
        <div className="text-danger fw-bold mb-2">
          Помилка: {error}
        </div>
      )}

      <ul className="list-group w-100 mb-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${getThemeClass(
              "",
              "bg-secondary text-light"
            )}`}
          >
            <div className="d-flex align-items-center flex-grow-1">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodoRequest(todo.id))}
              />
              {editingId === todo.id ? (
                <input
                  ref={inputRef}
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={submitEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                    flexGrow: 1,
                  }}
                  onClick={() => startEditing(todo)}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch(removeTodoRequest(todo.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between">
        <div className={`fw-bold ${getThemeClass("text-dark", "text-light")}`}>
          Всього: {todos.length}
        </div>
        <button
          className={`btn btn-sm ${getThemeClass(
            "btn-outline-dark",
            "btn-outline-light"
          )}`}
          onClick={() => dispatch(clearTodosRequest())}
        >
          Очистити всі
        </button>
      </div>
    </div>
  );
}
