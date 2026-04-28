import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./EmployerPage.css";
import { FaBriefcase, FaUsers, FaChartBar } from "react-icons/fa";

export default function RecruiterPage({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Pass role="recruiter" to Navbar */}
      <Navbar user={user} setUser={setUser} role="employer" />


      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="main-title">
              <span>Welcome, Recruiter!</span>
              <span className="highlight">Hire Top Talent</span>
            </h1>
            <p className="subtitle">
              Post jobs, manage applicants, and streamline your recruitment process efficiently.
            </p>
            <button className="enter-btn recruiter" onClick={() => navigate("/post-job")}>
              Post a Job
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/images/recruiter.jpg"
              alt="Recruiter Illustration"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features">
          <div className="card" onClick={() => navigate("/post-job")}>
            <FaBriefcase size={40} color="#6b21a8" />
            <h3>Post a Job</h3>
          </div>

          <div className="card" onClick={() => navigate("/manage-applicants")}>
            <FaUsers size={40} color="#6b21a8" />
            <h3>Manage Applicants</h3>
          </div>

          <div className="card" onClick={() => navigate("/analytics")}>
            <FaChartBar size={40} color="#6b21a8" />
            <h3>Analytics</h3>
          </div>
        </div>

        <div className="features-info">
          <h2>Why Choose Our Platform?</h2>
          <p>
            Our portal helps recruiters streamline hiring by managing job postings, 
            tracking applicants, and analyzing recruitment data efficiently. Trusted 
            by leading companies, we ensure you find the right talent quickly.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <h2>Recruiter Reviews</h2>
        <div className="reviews-cards">
          <div className="review-card">
            <p>⭐⭐⭐⭐⭐ "Found top talent quickly with this portal."</p>
          </div>
          <div className="review-card">
            <p>⭐⭐⭐⭐ "Easy job posting and applicant tracking."</p>
          </div>
        </div>
      </section>

      {/* Companies Marquee Section */}
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
