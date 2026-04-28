require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: String,
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);


app.post("/api/scores", async (req, res) => {
  try {
    const { name, email, category, score, total } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const newScore = new Score({ name, email, category, score, total });
    const savedScore = await newScore.save();

    console.log("Saved Score:", savedScore);
    res.json(savedScore);
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ date: -1 });
    console.log("Fetched Scores:", scores);
    res.json(scores);
  } catch (err) {
    console.error("Error fetching scores:", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
