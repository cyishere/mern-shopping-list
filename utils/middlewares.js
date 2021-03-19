const jwt = require("jsonwebtoken");
const User = require("../models/user");
const APP_SECRET = require("../utils/config").APP_SECRET;
const { unauthorizedError } = require("./helpers");

/**
 * Request Logger
 */
const requestLogger = (req, res, next) => {
  console.info("Method:", req.method);
  console.info("Path:", req.path);
  console.info("Body:", req.body);
  console.info("---");
  next();
};

/**
 * Error Hanlder
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });

  next();
};

/**
 * Authentication
 */
const auth = async (req, res, next) => {
  try {
    const reqHeaderInfo = req.header("Authorization");

    if (!reqHeaderInfo) {
      unauthorizedError("No authentication.");
    }

    const token = reqHeaderInfo.split(" ")[1];

    if (!token) {
      unauthorizedError("Invalid token.");
    }

    // Decode token
    const decoded = jwt.verify(token, APP_SECRET);

    // Verify user
    const user = await User.findById(decoded.userId);

    if (!user) {
      unauthorizedError("Invalid token.");
    }

    req.authenticated = true;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requestLogger, errorHandler, auth };
