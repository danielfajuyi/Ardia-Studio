import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    stack: {
      type: String,
    },
    jobTitle: {
      type: String, // User's stated role/position
    },
    password: {
      type: String, // Required if no Google ID
    },
    picture: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null/undefined for email users
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
