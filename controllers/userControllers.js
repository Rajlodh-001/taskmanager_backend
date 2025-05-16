const Task = require("../model/Task");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

//@desc Get all USers (admin Only)
//@route GET /api/users/
//@access private(Admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'member' }).select("-password");
 console.log(users)
    // TaskCount of Each User
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTask = await Task.countDocuments({
          assignedTo: user._id,
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
    res.json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.message });
  }
};

//@desc Get user by id
//@route GET /api/user/:id
//@access Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if(!user)return res.status(404).json({message:"User Not Found"});
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.Message });
  }
};

//@desc Delete user by ID
//@route DELETE /api/users/:id
//@access Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const user ="raj";
  } catch (error) {
    res.status(500).json({ Message: "Server Error ", error: error.Message });
  }
};

module.exports = { getUsers, getUserById, deleteUser };
