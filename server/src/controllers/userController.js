import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import User from "../models/User.js";
import { verifyStudentID } from "../services/ocrServices.js";

dotenv.config();

export const registerUser = async (req, res) => {
  // Register user
  try {
    console.log("---- Incoming Register ----");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("---------------------------");

    const {
      firstName,
      lastName,
      username,
      email,
      studentNumber,
      yearLevel,
      password,
    } = req.body;
    const idPhoto = req.file; // Multer path

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !studentNumber ||
      !yearLevel ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if ID photo was uploaded
    if (!idPhoto) {
      return res.status(400).json({ message: "ID photo is required" });
    }

    console.log("Uploaded file:", idPhoto);

    // OCR verification
    console.log("Verifying ID...");
    const verification = await verifyStudentID(idPhoto.path, studentNumber);
    if (!verification.isValid) {
      // Delete the uploaded file if verification fails
      fs.unlinkSync(idPhoto.path);

      return res.status(400).json({
        message: verification.message,
        extractedText: verification.extractedText, // Show detected file
      });
    }

    console.log("ID verified successfully!");
    // OCR verification

    const exists = await User.findOne({ email }); // Check for existing/ duplicate email
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (!idPhoto) {
      return res.status(400).json({ message: "ID photo is required" });
    }

    const hash = await bcrypt.hash(password, 10); // Hash password

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      studentNumber,
      yearLevel,
      password: hash,
      idPhotoPath: idPhoto.path, // Save file path to database
      isVerified: true, // Mark as verified if id passed OCR
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully!",
      verificationDetails: verification.message,
    });
  } catch (error) {
    console.log(error);
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  // Login user & admin
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Missing"); // Debug
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }); // Variable for db query
    if (!user) {
      // If email exists in the db
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.password); // Variable for db query
    if (!match) {
      // If password and password input exists in the db
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.userId = user._id;

    const userObj = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
    };

    req.session.user = userObj;

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Session save failed." });
      }

      res.json({
        message: "Login successful!",
        user: req.session.user,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  // Logout user
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Clear session cookie
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
