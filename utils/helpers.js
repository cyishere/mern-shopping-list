const badRequestError = (errorMsg) => {
  const error = new Error(errorMsg);
  error.statusCode = 400;
  throw error;
};

const unauthorizedError = (errorMsg) => {
  const error = new Error(errorMsg);
  error.statusCode = 401;
  throw error;
};

module.exports = { badRequestError, unauthorizedError };
