import multer from "multer";
import path from "path";

// OCR storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ids/"); // Save to uploads/ids/folder
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname.jpg
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Create upload instance
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});
