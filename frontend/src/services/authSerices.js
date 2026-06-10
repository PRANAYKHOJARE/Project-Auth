import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_TODO_API_URL}/auth`,
});

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const loginUser = (data) => {
  return API.post("/login", data);
};
