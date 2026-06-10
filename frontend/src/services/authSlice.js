import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getSafeUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getSafeUser(),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      if (action.payload && action.payload.token) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);

        let user = action.payload.user;
        if (!user) {
          try {
            user = jwtDecode(action.payload.token);
          } catch {
            user = null;
          }
        }

        state.user = user;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;