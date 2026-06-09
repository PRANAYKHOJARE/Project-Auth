import { useState, useEffect } from "react";
import "./TodoSection.css";

const API_BASE_URL =
  import.meta.env.VITE_TODO_API_URL || "http://localhost:5000/api";

function TodoSection() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/todos`);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const tempId = Date.now();
    const newTodo = { _id: tempId, text, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    setInputText("");

    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const saved = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
    } catch {
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
    }
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t._id === id);
    const updated = { ...todo, completed: !todo.completed };
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));

    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updated.completed }),
      });
    } catch {
      setTodos((prev) => prev.map((t) => (t._id === id ? todo : t)));
    }
  }

  async function handleDelete(id) {
    const backup = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
    } catch {
      setTodos(backup);
    }
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

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
          placeholder="Add a new task…"
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
            className={`todo-filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {loading && <p className="todo-state-msg">Loading tasks…</p>}
        {error && (
          <p className="todo-state-msg todo-error">
            ⚠ {error}.{" "}
            <button className="todo-retry" onClick={fetchTodos}>
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
                onClick={() => handleToggle(todo._id)}
                aria-label={
                  todo.completed ? "Mark incomplete" : "Mark complete"
                }
              >
                {todo.completed ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7.5" stroke="var(--todo-accent)" />
                    <path
                      d="M4.5 8l2.5 2.5 4.5-4.5"
                      stroke="var(--todo-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7.5" stroke="var(--todo-border)" />
                  </svg>
                )}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete"
                onClick={() => handleDelete(todo._id)}
                aria-label="Delete task"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default TodoSection;
