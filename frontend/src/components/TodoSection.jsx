import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "../services/todoSlice.js";

function TodoSection() {
  const dispatch = useDispatch();

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
    <section className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">My Tasks</h2>
        <span className="text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
          {activeCount} remaining
        </span>
      </div>

      {/* Input */}
      <form className="flex gap-2 mb-5" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 text-sm sm:text-base rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-1.5 mb-5">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition ${
              filter === f
                ? "bg-indigo-500 text-white border-indigo-500"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {loading && (
          <p className="text-center text-sm text-slate-400 py-6">Loading tasks...</p>
        )}

        {error && (
          <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            <span>⚠ {error}</span>
            <button
              onClick={() => dispatch(fetchTodos())}
              className="ml-3 text-xs underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-8">
            {filter === "completed"
              ? "No completed tasks yet."
              : "Nothing here — add your first task!"}
          </p>
        )}

        {!loading &&
          filtered.map((todo) => (
            <div
              key={todo._id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition group ${
                todo.completed
                  ? "bg-slate-50 border-slate-100"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Checkbox */}
              <button
                type="button"
                onClick={() => handleToggle(todo._id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition ${
                  todo.completed
                    ? "bg-indigo-500 border-indigo-500 text-white"
                    : "border-slate-300 hover:border-indigo-400"
                }`}
              >
                {todo.completed ? "✓" : ""}
              </button>

              {/* Text */}
              <span
                className={`flex-1 text-sm sm:text-base break-words min-w-0 ${
                  todo.completed
                    ? "line-through text-slate-400"
                    : "text-slate-700"
                }`}
              >
                {todo.text}
              </span>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleDelete(todo._id)}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition text-sm"
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