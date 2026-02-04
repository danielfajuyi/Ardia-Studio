import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      index: true, // e.g., 'hero', 'about'
    },
    key: {
      type: String,
      required: true, // e.g., 'title', 'subtitle', 'videoUrl'
    },
    value: {
      type: String, // The actual content text or url
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "link"],
      default: "text",
    },
  },
  { timestamps: true },
);

// Ensure unique keys per section
contentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.model("Content", contentSchema);
