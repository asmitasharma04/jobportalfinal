// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");

// const router = express.Router();
// const upload = multer(); //  Disk storage nahi, direct memory buffer

// // Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file ? {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         filename: req.file.originalname,
//       } : null,
//     });

//     await newApp.save();
//     res.status(201).json({ message: "Application submitted successfully!", application: newApp });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res.status(500).json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // Fetch resume for employer
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.id);

//     if (!application || !application.resume) {
//       return res.status(404).send("Resume not found");
//     }

//     res.set("Content-Type", application.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${application.resume.filename}"`);
//     res.send(application.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;




//Asmita
// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");

// const router = express.Router();
// const upload = multer(); // store file in memory

// // ------------------- Submit Application -------------------
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             filename: req.file.originalname,
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({
//       message: "Application submitted successfully!",
//       application: newApp,
//     });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res.status(500).json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // ------------------- Get All Applications -------------------
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });
//     res.json(applications);
//   } catch (err) {
//     console.error(" Fetch applications error:", err);
//     res.status(500).json({ message: "Failed to fetch applications", error: err.message });
//   }
// });

// // ------------------- Get Resume by Application ID -------------------
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.id);
//     if (!application || !application.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", application.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${application.resume.filename}"`);
//     res.send(application.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;






//Bhavisha

// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// // Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId)
//       return res.status(400).json({ message: "All fields are required!" });

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? { data: req.file.buffer, contentType: req.file.mimetype, filename: req.file.originalname }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({ message: "Application submitted successfully!", application: newApp });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res.status(500).json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // Get applicants for a specific job
// router.get("/job/:jobId", async (req, res) => {
//   try {
//     const applications = await Application.find({ jobId: req.params.jobId }).sort({ createdAt: -1 });
//     const applicants = applications.map(app => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//     }));
//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch job applications error:", err);
//     res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// // Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${app.resume.filename}"`);
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;


// Balreet 

// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// //  Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId)
//       return res.status(400).json({ message: "All fields are required!" });

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? { data: req.file.buffer, contentType: req.file.mimetype, filename: req.file.originalname }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({ message: "Application submitted successfully!", application: newApp });
//   } catch (err) {
//     console.error("Application submit error:", err);
//     res.status(500).json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // Get all applicants
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });
//     const applicants = applications.map(app => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//     }));
//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch all applications error:", err);
//     res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// //  Get applicants for a specific job
// router.get("/job/:jobId", async (req, res) => {
//   try {
//     const applications = await Application.find({ jobId: req.params.jobId }).sort({ createdAt: -1 });
//     const applicants = applications.map(app => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//     }));
//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch job applications error:", err);
//     res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// // Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${app.resume.filename}"`);
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error( Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;

// 19 Sept

// const express = require("express");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// // Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId)
//       return res.status(400).json({ message: "All fields are required!" });

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? { 
//             data: req.file.buffer, 
//             contentType: req.file.mimetype, 
//             filename: req.file.originalname 
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({ 
//       message: "Application submitted successfully!", 
//       application: newApp 
//     });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res.status(500).json({ message: "Failed to submit application", error: err.message });
//   }
// });

// //  Get applicants for a specific job
// router.get("/job/:jobId", async (req, res) => {
//   try {
//     const jobId = new mongoose.Types.ObjectId(req.params.jobId);
//     const applications = await Application.find({ jobId }).sort({ createdAt: -1 });

//     const applicants = applications.map(app => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//     }));

//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch job applications error:", err);
//     res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// //  Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${app.resume.filename}"`);
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;


// const express = require("express");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// // Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId)
//       return res.status(400).json({ message: "All fields are required!" });

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             filename: req.file.originalname,
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({
//       message: "Application submitted successfully!",
//       application: newApp,
//     });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // Get all applicants (for employer)
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });

//     const applicants = applications.map((app) => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//       jobId: app.jobId,
//     }));

//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch all applications error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// //  Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set(
//       "Content-Disposition",
//       `inline; filename="${app.resume.filename}"`
//     );
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// module.exports = router;




// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// // Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             filename: req.file.originalname,
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({
//       message: "Application submitted successfully!",
//       application: newApp,
//     });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // Get all applicants
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });

//     const applicants = applications.map((app) => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//       jobId: app.jobId,
//     }));

//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch all applications error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// //  Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set(
//       "Content-Disposition",
//       `inline; filename="${app.resume.filename}"`
//     );
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// //  Update applicant status (Accept/Reject)
// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     console.log(" Status update request:", req.params.id, status);

//     if (!["pending", "accepted", "rejected", "in-progress"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const updatedApp = await Application.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedApp)
//       return res.status(404).json({ message: "Application not found" });

//     console.log(" Status updated in DB:", updatedApp);
//     res.json({
//       message: "Status updated successfully",
//       application: updatedApp,
//     });
//   } catch (err) {
//     console.error(" Status update error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to update status", error: err.message });
//   }
// });

// module.exports = router;





// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");
// const router = express.Router();

// const upload = multer(); // memory storage

// //  Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             filename: req.file.originalname,
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({
//       message: "Application submitted successfully!",
//       application: newApp,
//     });
//   } catch (err) {
//     console.error(" Application submit error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to submit application", error: err.message });
//   }
// });

// //  Get all applicants
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });

//     const applicants = applications.map((app) => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//       jobId: app.jobId,
//     }));

//     res.json(applicants);
//   } catch (err) {
//     console.error(" Fetch all applications error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// //  Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set(
//       "Content-Disposition",
//       `inline; filename="${app.resume.filename}"`
//     );
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error(" Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// //  Update applicant status (Accept/Reject)
// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     console.log(" Status update request:", req.params.id, status);

//     if (!["pending", "accepted", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const updatedApp = await Application.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedApp)
//       return res.status(404).json({ message: "Application not found" });

//     console.log("Status updated in DB:", updatedApp);
//     res.json({
//       message: "Status updated successfully",
//       application: updatedApp,
//     });
//   } catch (err) {
//     console.error("🔥 Status update error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to update status", error: err.message });
//   }
// });

// // ✅ Delete applicant (after rejection)
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedApp = await Application.findByIdAndDelete(req.params.id);

//     if (!deletedApp) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     res.json({ message: "Application deleted successfully", id: req.params.id });
//   } catch (err) {
//     console.error("🔥 Delete error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to delete application", error: err.message });
//   }
// });

// module.exports = router;



// 14th OCT

// routes/application.js
// const express = require("express");
// const multer = require("multer");
// const Application = require("../models/Application");
// const Notification = require("../models/Notification"); // ✅ Added
// const User = require("../models/User"); // ✅ Added (to link notification to correct user)
// const router = express.Router();

// const upload = multer(); // memory storage

// // ✅ Submit application
// router.post("/", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, jobId } = req.body;
//     if (!name || !email || !phone || !jobId) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     const newApp = new Application({
//       name,
//       email,
//       phone,
//       jobId,
//       resume: req.file
//         ? {
//             data: req.file.buffer,
//             contentType: req.file.mimetype,
//             filename: req.file.originalname,
//           }
//         : null,
//     });

//     await newApp.save();
//     res.status(201).json({
//       message: "Application submitted successfully!",
//       application: newApp,
//     });
//   } catch (err) {
//     console.error("🔥 Application submit error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to submit application", error: err.message });
//   }
// });

// // ✅ Get all applicants
// router.get("/", async (req, res) => {
//   try {
//     const applications = await Application.find().sort({ createdAt: -1 });

//     const applicants = applications.map((app) => ({
//       id: app._id,
//       name: app.name,
//       email: app.email,
//       phone: app.phone,
//       resumeId: app._id,
//       resumeFilename: app.resume?.filename,
//       status: app.status,
//       jobId: app.jobId,
//     }));

//     res.json(applicants);
//   } catch (err) {
//     console.error("🔥 Fetch all applications error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch applicants", error: err.message });
//   }
// });

// // ✅ Download resume by application ID
// router.get("/resume/:id", async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app || !app.resume) return res.status(404).send("Resume not found");

//     res.set("Content-Type", app.resume.contentType);
//     res.set("Content-Disposition", `inline; filename="${app.resume.filename}"`);
//     res.send(app.resume.data);
//   } catch (err) {
//     console.error("🔥 Resume fetch error:", err);
//     res.status(500).send("Error fetching resume");
//   }
// });

// // ✅ Update applicant status (Accept/Reject)
// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     console.log("📌 Status update request:", req.params.id, status);

//     if (!["pending", "accepted", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const updatedApp = await Application.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedApp)
//       return res.status(404).json({ message: "Application not found" });

//     console.log("✅ Status updated in DB:", updatedApp);

//     // ✅ Send notification to the user when accepted/rejected
//     if (status === "accepted" || status === "rejected") {
//       // find user using application email
//       const user = await User.findOne({ email: updatedApp.email });
//       if (user) {
//         const message =
//           status === "accepted"
//             ? "🎉 Your job application has been accepted!"
//             : "❌ Your job application has been rejected.";

//         const notification = new Notification({
//           userId: user._id,
//           message,
//         });
//         await notification.save();

//         console.log("📨 Notification created for user:", user.email);
//       } else {
//         console.warn("⚠️ No user found for email:", updatedApp.email);
//       }
//     }

//     res.json({
//       message: "Status updated successfully",
//       application: updatedApp,
//     });
//   } catch (err) {
//     console.error("🔥 Status update error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to update status", error: err.message });
//   }
// });

// // ✅ Delete applicant (after rejection)
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedApp = await Application.findByIdAndDelete(req.params.id);

//     if (!deletedApp) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     res.json({ message: "Application deleted successfully", id: req.params.id });
//   } catch (err) {
//     console.error("🔥 Delete error:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to delete application", error: err.message });
//   }
// });

// module.exports = router;










// 12nov

const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Job = require("../models/Job"); // 🆕 Import Job model

const router = express.Router();
const upload = multer(); // memory storage

// ✅ Submit a new application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, jobId } = req.body;
    if (!name || !email || !phone || !jobId) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newApp = new Application({
      name,
      email,
      phone,
      jobId,
      resume: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            filename: req.file.originalname,
          }
        : null,
    });

    await newApp.save();

    // ✅ Create a "pending" notification for user
    const user = await User.findOne({ email });
    const job = await Job.findById(jobId);

    if (user && job) {
      const notification = new Notification({
        userId: user._id,
        jobId: job._id,
        message: `📩 Your application for the ${job.title} role at ${job.company} has been submitted successfully!`,
        status: "pending",
      });
      await notification.save();
      console.log("🆕 Notification created for submitted application:", user.email);
    }

    res.status(201).json({
      message: "Application submitted successfully!",
      application: newApp,
    });
  } catch (err) {
    console.error("🔥 Application submit error:", err);
    res.status(500).json({
      message: "Failed to submit application",
      error: err.message,
    });
  }
});

// ✅ Get all applicants
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    const applicants = applications.map((app) => ({
      id: app._id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      resumeId: app._id,
      resumeFilename: app.resume?.filename,
      status: app.status,
      jobId: app.jobId,
    }));

    res.json(applicants);
  } catch (err) {
    console.error("🔥 Fetch all applications error:", err);
    res.status(500).json({
      message: "Failed to fetch applicants",
      error: err.message,
    });
  }
});

// ✅ Download resume by application ID
router.get("/resume/:id", async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app || !app.resume) return res.status(404).send("Resume not found");

    res.set("Content-Type", app.resume.contentType);
    res.set("Content-Disposition", `inline; filename="${app.resume.filename}"`);
    res.send(app.resume.data);
  } catch (err) {
    console.error("🔥 Resume fetch error:", err);
    res.status(500).send("Error fetching resume");
  }
});

// ✅ Update applicant status (Accept/Reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    console.log("📌 Status update request:", req.params.id, status);

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApp) return res.status(404).json({ message: "Application not found" });

    const user = await User.findOne({ email: updatedApp.email });
    const job = await Job.findById(updatedApp.jobId);

    if (user && job) {
      const message =
        status === "accepted"
          ? `🎉 Congratulations! Your application for the ${job.title} role at ${job.company} has been accepted!`
          : `❌ Unfortunately, your application for the ${job.title} role at ${job.company} has been rejected.`;

      const existingNotification = await Notification.findOne({
        userId: user._id,
        jobId: job._id,
      });

      if (existingNotification) {
        existingNotification.message = message;
        existingNotification.status = status;
        existingNotification.isRead = false;
        await existingNotification.save();
        console.log(`🔄 Updated existing notification for ${user.email}`);
      } else {
        const newNotif = new Notification({
          userId: user._id,
          jobId: job._id,
          message,
          status,
          isRead: false,
        });
        await newNotif.save();
        console.log(`🆕 Created new notification for ${user.email}`);
      }
    }

    res.json({ message: "Status updated successfully", application: updatedApp });
  } catch (err) {
    console.error("🔥 Status update error:", err);
    res.status(500).json({
      message: "Failed to update status",
      error: err.message,
    });
  }
});

// ✅ Delete applicant
router.delete("/:id", async (req, res) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Application deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("🔥 Delete error:", err);
    res.status(500).json({
      message: "Failed to delete application",
      error: err.message,
    });
  }
});

module.exports = router;













