const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { sendSuccess } = require("../utils/apiResponse");

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

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

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
  updateUser,
  deleteUser,
};
