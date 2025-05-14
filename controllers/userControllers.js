const Task = require("../model/Task");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

//@desc Get all USers (admin Only)
//@route GET /api/users/
//@access private(Admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // TaskCount of Each User
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTask = await Task.countDocuments({
          assignedTo: user_id,
          status: "In Progress",
        });
        const completedTask = await Task.countDocuments({
          assignedTo: user_id,
          status: "Completed",
        });

        return {
          ...user._doc, //Include all existion user Data
          pendingTasks,
          inProgressTask,
          completedTask,
        };
      })
    );
    res.json(usersWithTaskCounts)
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
