import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice"; // Make sure this import is correct

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer, // This line must exist!
  },
});