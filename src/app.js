const express = require("express");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const requestLogger = require("./middlewares/requestLogger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables from .env into process.env.
dotenv.config();

const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

// Log every request before it reaches the routes.
app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Express MVC Users API",
    data: {
      health: "OK",
      docs: "/api/users",
    },
  });
});

app.use("/api/users", userRoutes);

// Keep these after all valid routes.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
