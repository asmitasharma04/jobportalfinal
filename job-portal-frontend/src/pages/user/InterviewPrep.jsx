// import React, { useState } from "react";
// import "./InterviewPrep.css";
// import { useNavigate } from "react-router-dom";

// const InterviewPrep = () => {
//   const navigate = useNavigate();
//   const [category, setCategory] = useState("DSA");

//   const handleStartPractice = () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       navigate("/interview-practice", { state: { category } }); // pass category
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="prep-card">
//       <h1 className="prep-title">Choose Your Practice Category</h1>
//       <p className="prep-subtitle">
//         Select a category and start practicing tailored MCQs with{" "}
//         <span className="brand">JobPortal</span>
//       </p>

//       <div className="prep-box">
//         <select
//           className="prep-dropdown"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="DSA">DSA</option>
//           <option value="Aptitude">Aptitude</option>
//           <option value="System Design">System Design</option>
//           <option value="Behavioral">Behavioral</option>
//         </select>
//       </div>

//       <button className="start-btn" onClick={handleStartPractice}>
//         START PRACTICE
//       </button>
//     </div>
//   );
// };

// export default InterviewPrep;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Cpu, Users } from "lucide-react";
import "./InterviewPrep.css";

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("DSA");

  const handleStartPractice = () => {
    const storedUser = localStorage.getItem("user");

    // ✅ SAME AUTH LOGIC AS REST OF APP
    if (storedUser) {
      navigate("/interview-practice", {
        state: { category },
      });
    } else {
      navigate("/"); // landing → login from navbar
    }
  };

  const categories = [
    { name: "DSA", icon: <Brain size={22} /> },
    { name: "Aptitude", icon: <Target size={22} /> },
    { name: "System Design", icon: <Cpu size={22} /> },
    { name: "Behavioral", icon: <Users size={22} /> },
  ];

  return (
    <div className="prep-container">
      <div className="prep-content">
        <div className="prep-icon">
          <Brain size={36} />
        </div>

        <h1 className="prep-title">Choose Your Practice Category</h1>

        <p className="prep-subtitle">
          Select a category and start practicing tailored MCQs with{" "}
          <span className="brand">JobPortal</span>
        </p>

        <div className="prep-grid">
          {categories.map((item) => (
            <div
              key={item.name}
              className={`prep-option ${
                category === item.name ? "selected" : ""
              }`}
              onClick={() => setCategory(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="prep-dropdown-box">
          <p className="dropdown-label">Or select from dropdown:</p>
          <select
            className="prep-dropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button className="start-btn" onClick={handleStartPractice}>
          START PRACTICE →
        </button>

        <p className="footer-note">
          Practicing DSA • Tailored questions for interview success
        </p>
      </div>
    </div>
  );
};

export default InterviewPrep;
