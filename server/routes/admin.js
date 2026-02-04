import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const upload = multer({ storage });

// Middleware to verify Admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// POST /api/admin/upload
router.post("/upload", verifyAdmin, (req, res) => {
  const uploadSingle = upload.single("video");

  uploadSingle(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res
        .status(500)
        .json({ message: "Upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      url: req.file.path,
      public_id: req.file.filename,
      message: "Video uploaded successfully",
    });
  });
});

export default router;
