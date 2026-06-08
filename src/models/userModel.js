const mongoose = require("mongoose");

// A schema defines the shape and validation rules for user documents.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
