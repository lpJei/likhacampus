import express from "express";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAdmin);
router.get("/admin", (req, res) => res.send("Admin page"));
router.get("/analytics", (req, res) => res.send("Analytics page"));
router.get("/announcements", (req, res) => res.send("Announcements page"));
router.get("/forum", (req, res) => res.send("Admin forum page"));
router.get("/projects", (req, res) => res.send("Admin projects page"));
router.get("/users", (req, res) => res.send("User management page"));
export default router;
