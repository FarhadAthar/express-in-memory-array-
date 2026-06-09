const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { sendSuccess } = require("../utils/apiResponse");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return sendSuccess(res, 200, "Users fetched successfully", users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    return sendSuccess(res, 200, "User fetched successfully", user);
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return sendSuccess(res, 201, "User created successfully", user);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return sendSuccess(res, 200, "Login successful", {
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, "Protected route accessed successfully", {
      user: req.user,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("+password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Using save() makes sure the password hashing middleware runs on update.
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.age = req.body.age ?? user.age;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    return sendSuccess(res, 200, "User updated successfully", user);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(new AppError("User not found", 404));
    }

    return sendSuccess(res, 200, "User deleted successfully", deletedUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
};
