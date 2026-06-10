import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_TODO_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return rejectWithValue("Unauthorized");
    }
    if (!res.ok) throw new Error("Failed to fetch todos");
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async ({ id, completed }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return { id, completed };
  } catch (err) {
    return rejectWithValue({ id, err: err.message });
  }
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error("Failed to delete todo");
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Unauthorized") {
          state.error = action.payload;
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find((t) => t._id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;