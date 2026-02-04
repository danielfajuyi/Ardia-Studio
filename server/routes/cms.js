import express from "express";
import Content from "../models/Content.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify Admin
const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET all content (Public or maybe protected? Usually public for the frontend to render)
// We'll make a public endpoint to FETCH content, and protected to UPDATE.
router.get("/", async (req, res) => {
  try {
    const content = await Content.find({});
    // Transform to easy object format: { hero: { title: "foo" } }
    const formatted = content.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = {};
      acc[item.section][item.key] = item.value;
      return acc;
    }, {});
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching content" });
  }
});

// POST /update (Admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { section, key, value, type } = req.body;

    const content = await Content.findOneAndUpdate(
      { section, key },
      { value, type },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Error updating content" });
  }
});

export default router;
