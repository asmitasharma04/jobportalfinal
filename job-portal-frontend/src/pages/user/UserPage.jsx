import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaFileAlt, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";
import "./UserPage.css";

export default function UserPage({ user, setUser, role }) {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Floating Background Circles */}
      <div className="floating-bg">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>

      <Navbar user={user} setUser={setUser} role={role} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="main-title">
              <span>Welcome, Job Seeker!</span>
              <span className="highlight">Boost Your Career</span>
            </h1>
            <p className="subtitle">
              Explore tools to build your resume, prepare for interviews, and
              apply to top companies seamlessly.
            </p>
            <button className="enter-btn user" onClick={() => navigate("/jobs")}>
              Find Jobs
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/images/choice-worker-concept.png"
              alt="Career Illustration"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features">
          <div className="card" onClick={() => navigate("/resume-builder")}>
            <FaFileAlt size={40} className="icon-gradient" />
            <h3>Resume Builder</h3>
          </div>

          <div className="card" onClick={() => navigate("/interview-prep")}>
            <FaChalkboardTeacher size={40} className="icon-gradient" />
            <h3>Interview Prep</h3>
          </div>

          <div className="card" onClick={() => navigate("/jobs")}>
            <FaBriefcase size={40} className="icon-gradient" />
            <h3>Jobs</h3>
          </div>

          <div className="card" onClick={() => navigate("/notifications")}>
            <span className="icon-gradient" style={{ fontSize: "2rem" }}>🔔</span>
            <h3>Notifications</h3>
          </div>
        </div>

        <div className="features-info">
          <h2>Why Choose Us?</h2>
          <p>
            Trusted by thousands of job seekers and top companies, our platform
            provides AI-powered tools for resume building, personalized
            interview prep, and instant notifications. Your career journey
            becomes smarter and smoother here.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <h2>User Reviews</h2>
        <div className="reviews-cards">
          <div className="review-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p>"This portal helped me land my first job!"</p>
          </div>
          <div className="review-card">
            <p>⭐⭐⭐⭐</p>
            <p>"Amazing tools for interview preparation."</p>
          </div>
          <div className="review-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Resume builder is so easy and professional!"</p>
          </div>
        </div>
      </section>

<section className="companies-section">
  <h2>Trusted by Top Companies</h2>
  <div className="marquee">
    <div className="marquee-track">
      <img src="/images/microsoft.png" alt="Microsoft" />
      <img src="/images/amazon.png" alt="Amazon" />
      <img src="/images/Accenture.png" alt="Accenture" />
      <img src="/images/tcs.png" alt="TCS" />
      <img src="/images/infosys.png" alt="Infosys" />
      <img src="/images/google.png" alt="Google" />

      {/* Duplicate for continuous scroll */}
      <img src="/images/microsoft.png" alt="Microsoft" />
      <img src="/images/amazon.png" alt="Amazon" />
      <img src="/images/Accenture.png" alt="Accenture" />
      <img src="/images/tcs.png" alt="TCS" />
      <img src="/images/infosys.png" alt="Infosys" />
      <img src="/images/google.png" alt="Google" />
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}
