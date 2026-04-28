const express = require("express");
const Resume = require("../models/Resume");
const router = express.Router();

// POST resume
router.post("/", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.json({ message: "Resume saved successfully", resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all resumes
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
