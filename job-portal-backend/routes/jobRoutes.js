// const express = require("express");
// const Job = require("../models/Job");
// const router = express.Router();

// // POST job
// router.post("/", async (req, res) => {
//   try {
//     const job = new Job(req.body);
//     await job.save();
//     res.json({ message: "Job posted successfully", job });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET all jobs
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;







// const express = require("express");
// const router = express.Router();
// const Job = require("../models/Job"); // Make sure this exists

// // Create new job
// router.post("/", async (req, res) => {
//   try {
//     const { title, company, location, salary, jobType, description, skills } = req.body;

//     if (!title || !company || !location || !description)
//       return res.status(400).json({ message: "Please fill all required fields" });

//     const newJob = new Job({
//       title,
//       company,
//       location,
//       salary,
//       jobType,
//       description,
//       skills,
//     });

//     await newJob.save();
//     res.status(201).json({ message: "Job posted successfully", job: newJob });
//   } catch (err) {
//     console.error("🔥 Error posting job:", err);
//     res.status(500).json({ message: "Failed to post job", error: err.message });
//   }
// });

// module.exports = router;





const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Create a new job
router.post("/", async (req, res) => {
  try {
    const { title, company, location, salary, jobType, description, skills } = req.body;
    if (!title || !company || !location || !description)
      return res.status(400).json({ message: "Please fill all required fields" });

    const newJob = new Job({ title, company, location, salary, jobType, description, skills });
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error("🔥 Error posting job:", err);
    res.status(500).json({ message: "Failed to post job", error: err.message });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("🔥 Error fetching jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
});

module.exports = router;
