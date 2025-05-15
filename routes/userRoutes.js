const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", protect, adminOnly, getUsers); //get all user from admin

router.get("/:id", protect, getUserById); // get a specific user
router.delete("/:id", protect, adminOnly, deleteUser); //Delete User (admin Only)

module.exports = router;
