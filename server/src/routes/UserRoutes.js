import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected routes
router.use(requireAuth);
router.get("/home", (req, res) => res.send("User home page"));
router.get("/forum", (req, res) => res.send("User forum page"));
router.get("/projects", (req, res) => res.send("User projects page"));
router.get("/skills", (req, res) => res.send("User skills page"));
router.get("/skills/quiz", (req, res) => res.send("User quiz page"));
router.get("/profile/:username", (req, res) =>
  res.send(`User profile page for ${req.params.username}`)
);
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select(-password);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/settings", (req, res) => res.send("User settings page"));
router.get("/notification", (req, res) => res.send("User notifications"));

export default router;
