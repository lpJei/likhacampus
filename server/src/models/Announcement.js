import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String }, // img path storage
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.Model("Announcement", announcementSchema);
