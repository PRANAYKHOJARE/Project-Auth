import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "../services/todoSlice.js";
import "./TodoSection.css";

function TodoSection() {
  const dispatch = useDispatch();

  // Extract 'items' from Redux state but rename it to 'todos' so your component functions work
  const { items: todos = [], loading = false, error = null } = useSelector(
    (state) => state.todos || {}
  );

  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    dispatch(addTodo(text));
    setInputText("");
  };

  const handleToggle = (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    dispatch(toggleTodo({ id, completed: !todo.completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <section className="todo-section">
      <div className="todo-header">
        <h2 className="todo-title">My Tasks</h2>
        <span className="todo-badge">{activeCount} remaining</span>
      </div>

      <form className="todo-input-row" onSubmit={handleAdd}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="todo-add-btn"
          type="submit"
          disabled={!inputText.trim()}
        >
          Add
        </button>
      </form>

      <div className="todo-filters">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            type="button"
            className={`todo-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {loading && <p className="todo-state-msg">Loading tasks...</p>}

        {error && (
          <p className="todo-state-msg todo-error">
            ⚠ {error}
            <button className="todo-retry" onClick={() => dispatch(fetchTodos())}>
              Retry
            </button>
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="todo-state-msg todo-empty">
            {filter === "completed"
              ? "No completed tasks yet."
              : "Nothing here — add your first task!"}
          </p>
        )}

        {!loading &&
          filtered.map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.completed ? "done" : ""}`}
            >
              <button
                className="todo-checkbox"
                type="button"
                onClick={() => handleToggle(todo._id)}
              >
                {todo.completed ? "✓" : ""}
              </button>

              <span className="todo-text">{todo.text}</span>

              <button
                className="todo-delete"
                type="button"
                onClick={() => handleDelete(todo._id)}
              >
                ✕
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default TodoSection;