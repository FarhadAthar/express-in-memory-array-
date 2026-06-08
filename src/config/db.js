const mongoose = require("mongoose");

// This function connects Express to MongoDB using the MONGO_URI value from .env.
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    // Stop the app if the database connection fails.
    process.exit(1);
  }
};

module.exports = connectDB;
