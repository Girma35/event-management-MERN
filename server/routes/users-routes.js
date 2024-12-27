const express = require("express");
const router = express.Router();
const userModel = require("../models/user-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    // Check if user exists
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save user with hashed password
    const newUser = new userModel({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Check if user exists
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
