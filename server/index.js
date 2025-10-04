import dotenv from "dotenv";
dotenv.config();

import MongoStore from "connect-mongo";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import connect from "./src/config/db.js";
import adminRoutes from "./src/routes/AdminRoutes.js";
import authRoutes from "./src/routes/AuthRoutes.js";
import userRoutes from "./src/routes/UserRoutes.js";

// Debug check
console.log(
  "SESSION_SECRET loaded:",
  process.env.SESSION_SECRET ? "YES" : "NO"
);
console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "YES" : "NO");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to db
await connect();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-change-me",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
