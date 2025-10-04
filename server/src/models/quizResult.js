import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  skill: { type: String },
});

export default mongoose.Model("QuizResult", quizResultSchema);
