// import React, { useState } from "react";
// import "./PostJob.css";

// const PostJob = () => {
//   const [jobData, setJobData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     jobType: "Full-Time",
//     description: "",
//     skills: "",
//   });

//   const handleChange = (e) => {
//     setJobData({ ...jobData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Job Posted:", jobData);
//     alert("Job posted successfully!");
//     // Later: Send data to backend via fetch/axios
//   };

//   return (
//     <div className="postjob-container">
//       <h2 className="postjob-title">Post a New Job</h2>
//       <form className="postjob-form" onSubmit={handleSubmit}>
        
//         <div className="form-group">
//           <label>Job Title</label>
//           <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Company</label>
//           <input type="text" name="company" value={jobData.company} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Location</label>
//           <input type="text" name="location" value={jobData.location} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Salary (per annum)</label>
//           <input type="text" name="salary" value={jobData.salary} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Job Type</label>
//           <select name="jobType" value={jobData.jobType} onChange={handleChange}>
//             <option value="Full-Time">Full-Time</option>
//             <option value="Part-Time">Part-Time</option>
//             <option value="Internship">Internship</option>
//             <option value="Contract">Contract</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Required Skills</label>
//           <input type="text" name="skills" value={jobData.skills} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
//         </div>

//         <div className="form-group full-width">
//           <label>Job Description</label>
//           <textarea name="description" value={jobData.description} onChange={handleChange} rows="5" required />
//         </div>

//         <div className="form-group full-width">
//           <button type="submit" className="postjob-btn">Post Job</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostJob;




















import React, { useState } from "react";
import "./PostJob.css";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to post job");

      const result = await res.json();
      alert("✅ Job posted successfully!");
      console.log("Job Saved:", result);

      // reset form
      setJobData({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
        description: "",
        skills: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error posting job. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="postjob-container">
      <h2 className="postjob-title">Post a New Job</h2>
      <form className="postjob-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Salary (per annum)</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label>Required Skills</label>
          <input
            type="text"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group full-width">
          <label>Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group full-width">
          <button type="submit" className="postjob-btn" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
