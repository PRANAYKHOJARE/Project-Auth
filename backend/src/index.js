import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URL from index.js =", process.env.MONGO_URL);

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import router from "./routes/auth.route.js";
import todoRouter from "./routes/todo.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", router);
app.use("/api/todos", todoRouter);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    // Start server ONLY after DB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
