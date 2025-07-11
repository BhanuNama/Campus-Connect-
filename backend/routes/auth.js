const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { userId, password, role } = req.body;

  if (!userId || !password || !role) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    let user;

    if (role === "student") {
      user = await Student.findOne({ rollNumber: userId });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ teacherId: userId });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password validation
    if (role === "student") {
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    if (role === "teacher") {
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Use JWT_SECRET from env or fallback
    const jwtSecret = process.env.JWT_SECRET || "campus_connect_jwt_secret_2024_secure_key";
    const jwtExpiry = process.env.JWT_EXPIRES_IN || "24h";

    const payload = { id: user._id, role: role }; 
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiry,
    });

    res.json({ token, userId: userId });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
