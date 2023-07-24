const notFund = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Function to handle errors and send appropriate response
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 if not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set default error message to err.message
  let message = err.message;

  // Check if error is a CastError with kind as ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    // Set status code to 404
    statusCode = 404;
    // Set message to "Not Found"
    message = "Not Found";
  }

  // Send response with appropriate status code and message
  res.status(statusCode).json({
    message: message,
    // Only include stack trace in response if not in production environment
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFund, errorHandler };
