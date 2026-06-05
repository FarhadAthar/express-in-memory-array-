const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { sendSuccess } = require("../utils/apiResponse");

const getUsers = (req, res) => {
  const users = User.findAll();

  return sendSuccess(res, 200, "Users fetched successfully", users);
};

const getUserById = (req, res, next) => {
  const user = User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return sendSuccess(res, 200, "User fetched successfully", user);
};

const createUser = (req, res) => {
  const user = User.create(req.body);

  return sendSuccess(res, 201, "User created successfully", user);
};

const updateUser = (req, res, next) => {
  const user = User.update(req.params.id, req.body);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return sendSuccess(res, 200, "User updated successfully", user);
};

const deleteUser = (req, res, next) => {
  const deletedUser = User.remove(req.params.id);

  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }

  return sendSuccess(res, 200, "User deleted successfully", deletedUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
