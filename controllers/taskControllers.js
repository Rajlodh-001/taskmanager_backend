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
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );
    // summery count
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });
    const inProgerssTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.json({
      tasks,
      statusSummery: {
        all: allTasks,
        pendingTasks,
        inProgerssTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc  Get task by ID
// @route GET /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
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
    console.log("Array after");
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
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(405).json({ message: "task not found" });
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo mustbe  an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }
    const updateTask = await task.save();
    res.json({ message: "Task update successfully", updateTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc Delete a Task (admin only)
// @route DELETE /api/tasks/:ID
// @access Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).json({ message: "Task not found" });
    await task.deleteOne();
    res.json({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc update task status
// @route PUT /api/tasks/:id/status
// @access Private
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) res.status(404).json({ message: "Task not found" });
    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    task.status = req.body.status || task.status;

    if (task.status === "Complited") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }
    await task.save();
    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc update task checklist
// @route PUT /api/tasks/:id/todo
// @access Private
const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).json({ message: "Task not found" });
    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not Authorszed to update checklist" });
    }
    task.todoChecklist = todoChecklist; // replace with updated checklist

    // auto-update progress based on checklist complition
    const completedCount =task.todoChecklist.filter(
      (item)=>item.completed
    ).length;
    const totalItems =task.todoChecklist.length;
    task.progress=totalItems >0 ?Math.round((completedCount/totalItems)*100):0;

    // auto-mark task as complite if all item are checked
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }

    await task.save();
    const updateTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
    res.json({message:"Task Checklist Updated",task:updateTask})
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc DashboardData (admin only)
// @route GET /api/tasks/dashboard-data
// @access Private
const getDashboardData = async (req, res) => {
  try {
    // Fetch stats
    const totalTask =await Task.countDocuments();
    const pendingTask =await Task.countDocuments({status:"Pending"});
    const completedTasks=await Task.countDocuments({status:"Completed"});
    const overdueTask=await Task.countDocuments({
      status:{$ne:"Completed"},
      dueDate:{$lt: new Date()},
    })

    // Ensure All possiable status are included 
    const taskStatuses= ["Pending","In Progress","Completed"];


    
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
