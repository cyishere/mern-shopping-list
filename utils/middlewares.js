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

module.exports = { errorHandler };
