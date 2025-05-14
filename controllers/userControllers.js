const Task = require("../model/Task");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

//@desc Get all USers (admin Only)
//@route GET /api/users/
//@access private(Admin)
const getUsers = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.Message });
  }
};

//@desc Get user by id
//@route GET /api/user/:id
//@access Private
const getUserById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.Message });
  }
};

//@desc Delete user by ID
//@route DELETE /api/users/:id
//@access Private (Admin)
const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.Message });
  }
};

module.exports = { getUsers, getUserById, deleteUser };
