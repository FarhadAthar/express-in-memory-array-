const dotenv = require("dotenv");

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Load environment variables before connecting to MongoDB.
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
