const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST/api/auth/register
// @access Public
const registerUser = async (req, res) => {};

// @desc  Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {};

// @desc Get user Profile
// @route POST /api/auth/profile
// @access Private (JWT)
const getUserProfile = async (req, res) => {};

// @desc Update user Profile
// @route PUT /api.auth/profile
// @access Private (JWT)
const updateUserProfile = async (req, res) => {};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
