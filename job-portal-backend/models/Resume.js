const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  summary: { type: String },

  skills: [{ type: String }], 
  education: [{ type: String }], // Each entry = one line of education
  experience: [{ type: String }], // Each entry = one experience
  projects: [{ type: String }], // Each entry = one project
  links: [{ type: String }], // Each entry = one link (GitHub, LinkedIn, etc.)

  format: { 
    type: String, 
    enum: ["classic", "modern"], 
    default: "classic" 
  }, // which template user chose

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);
