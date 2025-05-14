const multer = require("multer");

// confi Store
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});

// file filter

const fileFilter = (req, res, cd) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  }else{
    cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'))
  }
};

const upload = multer({storage,fileFilter});

module.exports =upload;

