import config from "../config/config.js"; // Assuming you have a config file for environment variables

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const stack = err.stack;

  return res.status(status).json({
    success: false,
    status,
    message,
    stack: config.env === "development" ? stack : null,
  });
};

export default errorHandler;
