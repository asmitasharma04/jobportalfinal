// routes/analytics.js
const express = require("express");
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get all jobs
    const jobs = await Job.find();
    const totalJobs = jobs.length;

    // Get all applications
    const applications = await Application.find();

    const totalApplicants = applications.length;
    const accepted = applications.filter(a => a.status === "accepted").length;
    const rejected = applications.filter(a => a.status === "rejected").length;
    const pending = applications.filter(a => !a.status || a.status === "pending").length;

    // Group applicants by job
    const applicantsPerJob = jobs.map(job => ({
      name: job.title,
      applicants: applications.filter(a => a.jobId?.toString() === job._id.toString()).length
    }));

    res.json({
      totalJobs,
      totalApplicants,
      accepted,
      rejected,
      pending,
      applicantsPerJob
    });
  } catch (err) {
    console.error("🔥 Analytics fetch error:", err);
    res.status(500).json({ error: "Failed to load analytics" });
  }
});

module.exports = router;