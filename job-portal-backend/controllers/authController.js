const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ msg: "Signup successful" });
  } catch (error) {
    res.status(500).json({ msg: "Error in signup", error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true only in production with HTTPS
      sameSite: "strict",
    });

    res.json({ msg: "Login successful", user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ msg: "Error in login", error });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};
