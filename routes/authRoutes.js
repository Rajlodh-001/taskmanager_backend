const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload =require("../middleware/uploadMiddleware")

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authControllers");

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


// upload image 
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no FIle uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({imageUrl})
});

module.exports = router;
