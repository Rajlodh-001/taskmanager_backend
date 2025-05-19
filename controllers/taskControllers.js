const Task = require("../model/Task");

// @desc Get All task (Admain :all , user:only assigned tasks)
// @route GET /api/task/
// @access Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter;
    if (status) {
      filter.status = status;
    }
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // add Complete todoChecklist count to eachTask
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return {...task._doc,completedTodoCount:completedCount};
      })
    );
    // summery count
    const allTasks=await Task.countDocuments(
      req.user.role ==="admin"?{}:{assignedTo:req.user._id}
    );

    const pendingTasks =await Task.countDocuments({
      ...filter,
      status:"Pending",
      ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
    });
    const inProgerssTasks=await Task.countDocuments({
      ...filter,
      status:"In Progress",
      ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
    });

     const completedTasks=await Task.countDocuments({
      ...filter,
      status:"Completed",
      ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
    });

    res.json({
      tasks,
      statusSummery:{
        all:allTasks,
        pendingTasks,inProgerssTasks,completedTasks

      }
    })

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
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    
    if (!Array.isArray(assignedTo)) {
      res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todoChecklist,
      attachments,
    });
    console.log("Array after")
    res.status(201).json({ message: "Task created Successfully ", task });
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
const updateTaskChecklist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

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
  updateTaskChecklist,
};
