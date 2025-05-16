const Task = require("../model/Task");

// @desc Get All task (Admain :all , user:only assigned tasks)
// @route GET /api/task/
// @access Private
const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc  Get task by ID
// @route GET /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Create a new Task (admin Only)
// @route POST /api/tasks/
// @access Private
const createTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update task details
// @route PUT /api/tasks/
// @access Private
const updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc Delete a Task (admin only)
// @route DELETE /api/tasks/:ID
// @access Private
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc update task status
// @route PUT /api/tasks/:id/status
// @access Private
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc update task checklist
// @route PUT /api/tasks/:id/todo
// @access Private
const updateTaskChecklist=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

// @desc DashboardData (admin only)
// @route GET /api/tasks/dashboard-data
// @access Private
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc DeshboardData User-Specifice
// @route GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getDashboardData,
  getUserDashboardData,
  updateTaskChecklist
};
