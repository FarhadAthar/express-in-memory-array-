const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose sends this when an id is not a valid MongoDB ObjectId.
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid user id";
  }

  // Mongoose validation errors happen when required fields are missing or invalid.
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // MongoDB duplicate key error, for example when email already exists.
  if (err.code === 11000) {
    statusCode = 400;
    message = "Email already exists";
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = errorHandler;
