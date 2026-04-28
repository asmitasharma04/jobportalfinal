const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  question: { type: String, required: true },
  selectedOption: { type: Number, required: true },
  correctAnswer: { type: Number, required: true },
  score: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", ResultSchema);
