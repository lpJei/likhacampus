import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema ({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  comments: {},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.Model("ForumPost", forumPostSchema);