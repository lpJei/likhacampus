import express from "express";
import { upload } from "../config/multer.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", upload.single("idPhoto"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
