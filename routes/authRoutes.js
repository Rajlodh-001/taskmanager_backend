const express = require("express");
const { protect } =  require("../middleware/authMiddleware");

const{registerUser,loginUser,getUserProfile,updateUserProfile } = require("../controllers/authControllers")

const router = express.Router();

// Auth Routes

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

//Get User Profile
router.get("/profile", protect, getUserProfile);

//Update User Profile
router.put("/profile", updateUserProfile);

module.exports = router;
