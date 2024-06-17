import express from "express";
import createError from "http-errors";
import { config } from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello World from backend",
  });
});

// Example route that triggers an error

app.get("/error", (req, res, next) => {
  next(createError(400, "This is a bad request"));
});

// Global Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const stack = err.stack;
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: config.env === "development" ? stack : null,
  });
});

export default app;