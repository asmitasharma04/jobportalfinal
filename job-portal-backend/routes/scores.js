// // routes/scores.js
// const express = require("express");
// const router = express.Router();
// const Score = require("../models/Score");
// const authMiddleware = require("../middleware/authMiddleware");

// // save score
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { category, score, total } = req.body;
//     const newScore = new Score({
//       userId: req.user.id,
//       category,
//       score,
//       total,
//     });
//     await newScore.save();
//     res.json(newScore);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;









// Example Scores model
// const mongoose = require("mongoose");

// const scoreSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   email: { type: String, required: true },
//   category: String,
//   score: Number,
//   total: Number,
//   date: { type: Date, default: Date.now }
// });

// const Score = mongoose.model("Score", scoreSchema);

// app.post("/api/scores", async (req, res) => {
//   try {
//     const { userId, email, category, score, total } = req.body;

//     const newScore = new Score({
//       userId,
//       email,
//       category,
//       score,
//       total
//     });

//     await newScore.save();
//     res.json({ message: "Score saved successfully" });
//   } catch (err) {
//     console.error("Error saving score:", err);
//     res.status(500).json({ error: "Failed to save score" });
//   }
// });





//Corrected code storing in mongoDB
const mongoose = require("mongoose");

// Updated schema to include 'name'
const scoreSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },    // ✅ added
  email: { type: String, required: true },
  category: String,
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

// POST route to save score
app.post("/api/scores", async (req, res) => {
  try {
    const { userId, name, email, category, score, total } = req.body;

    const newScore = new Score({
      userId,
      name,
      email,
      category,
      score,
      total,
    });

    const savedScore = await newScore.save();

    // ✅ Return the full saved document
    res.json(savedScore);
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

