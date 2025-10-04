import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainSkill: { type: String, required: true },
  subSkill: { type: String, required: true },
  media: [],
});

export default mongoose.Model("Project", projectSchema);
