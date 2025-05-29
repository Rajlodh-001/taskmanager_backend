const express =require("express");

const {protect,adminOnly} = require('../middleware/authMiddleware');
const{getTasks,getDashboardData,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask,getUserDashboardData,updateTaskChecklist}=require("../controllers/taskControllers")

const router =express.Router();


router.get("/dashboard-date",protect,getDashboardData);
router.get("/user-dashboard-data",protect ,getUserDashboardData);
router.get("/",protect,getTasks)
router.get("/:id",protect,getTaskById);                     
router.post("/",protect,adminOnly ,createTask)
router.put("/:id",protect ,updateTask)
router.delete("/:id",protect,adminOnly,deleteTask);
router.put("/:id/status",protect,updateTaskStatus);
router.put("/:id/todo",protect, updateTaskChecklist)

module.exports =router;

