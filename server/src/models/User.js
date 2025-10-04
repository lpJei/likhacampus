import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Auth
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email",
      ],
    },
    studentNumber: { type: String, required: true, unique: true, minLength: 9 },
    yearLevel: {
      type: String,
      required: true,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    password: { type: String, required: true, minLength: 8 },
    idPhotoPath: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Profile page
    firstName: { type: String, required: true, trim: true, minLength: 2 },
    lastName: { type: String, required: true, trim: true, minLength: 2 },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    username: { type: String, required: true, minLength: 2 },

    isVerified: { type: Boolean, default: false }, // OCR verification status
    verificationDate: { type: Date },
    //role: { type: String, default: "user" },

    // Skill
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
