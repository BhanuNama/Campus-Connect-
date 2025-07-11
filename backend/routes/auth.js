const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const config = require("../config");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("🔐 Login attempt:", { userId: req.body.userId, role: req.body.role });
  
  const { userId, password, role } = req.body;

  if (!userId || !password || !role) {
    console.log("❌ Missing required fields");
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    let user;
    console.log(`🔍 Looking for ${role} with ID: ${userId}`);

    if (role === "student") {
      user = await Student.findOne({ rollNumber: userId });
      console.log("👤 Student query result:", user ? "Found" : "Not found");
    } else if (role === "teacher") {
      user = await Teacher.findOne({ teacherId: userId });
      console.log("👨‍🏫 Teacher query result:", user ? "Found" : "Not found");
    } else {
      console.log("❌ Invalid role:", role);
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password validation
    console.log("🔐 Validating password...");
    if (user.password !== password) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Use JWT_SECRET from config
    const jwtSecret = config.jwtSecret;
    if (!jwtSecret) {
      console.error("❌ JWT_SECRET not configured!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    console.log("✅ Creating JWT token...");
    const payload = { id: user._id, role: role }; 
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });

    console.log("✅ Login successful for:", userId);
    res.json({ 
      token, 
      userId: userId,
      role: role,
      name: user.name 
    });

  } catch (error) {
    console.error("💥 Login error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
