// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String },
//   jobType: { 
//     type: String, 
//     enum: ["Full-Time", "Part-Time", "Internship", "Contract"], 
//     default: "Full-Time" 
//   },
//   skills: [{ type: String }], // store as array of skills
//   description: { type: String, required: true },
//   postedBy: { type: String }, // employer ID or name
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Job", jobSchema);





// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String },
//   jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], default: "Full-Time" },
//   description: { type: String, required: true },
//   skills: { type: String },
// }, { timestamps: true });

// module.exports = mongoose.model("Job", jobSchema);



// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String },
//   jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], default: "Full-Time" },
//   description: { type: String, required: true },
//   skills: { type: String },
// }, { timestamps: true });

// module.exports = mongoose.model("Job", jobSchema);

// 19 Sept

// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   salary: { type: String },
//   jobType: { 
//     type: String, 
//     enum: ["Full-Time", "Part-Time", "Internship", "Contract"], 
//     default: "Full-Time" 
//   },
//   description: { type: String, required: true },
//   skills: { type: String },
// }, { timestamps: true });

// module.exports = mongoose.model("Job", jobSchema);


// 14th OCT

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  jobType: { 
    type: String, 
    enum: ["Full-Time", "Part-Time", "Internship", "Contract"], 
    default: "Full-Time" 
  },
  description: { type: String, required: true },
  skills: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);



