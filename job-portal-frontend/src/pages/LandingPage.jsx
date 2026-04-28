import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  UserCircle,
  Sparkles,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleEnter = (selectedRole) => {
    if (selectedRole === "user") {
      navigate("/user");
    } else {
      // employer + recruiter
      navigate("/employer");
    }
  };

  return (
    <div className="landing-container">
      {/* Floating background shapes */}
      <div className="floating-bg">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>

      <div className="content">
        <h1 className="main-title">
          <span>Welcome to</span>
          <span className="highlight">Job Portal</span>
        </h1>

        <p className="subtitle">
          Find your dream job or hire top talent in a platform built for success
        </p>

        <div className="cards-container">
          {/* Job Seeker Card */}
          <div className="role-card role-user">
            <div className="card-header">
              <div className="icon-box user-gradient">
                <UserCircle className="icon-inner" />
              </div>
              <h2>Job Seeker</h2>
            </div>

            <p>
              Discover thousands of opportunities from top companies and build
              your career
            </p>

            <ul className="features-list">
              <li>
                <Target className="icon-sm" /> Browse thousands of jobs
              </li>
              <li>
                <TrendingUp className="icon-sm" /> Track your applications
              </li>
              <li>
                <Sparkles className="icon-sm" /> Get matched instantly
              </li>
            </ul>

            <button
              className="enter-btn user-gradient"
              onClick={() => handleEnter("user")}
            >
              Enter as Job Seeker
            </button>
          </div>

          {/* Employer / Recruiter Card */}
          <div className="role-card role-employer">
            <div className="card-header">
              <div className="icon-box employer-gradient">
                <Briefcase className="icon-inner" />
              </div>
              <h2>Recruiter</h2>
            </div>

            <p>
              Connect with talented professionals and build your dream team
            </p>

            <ul className="features-list">
              <li>
                <Users className="icon-sm" /> Access top talent pool
              </li>
              <li>
                <TrendingUp className="icon-sm" /> Manage applications
              </li>
              <li>
                <Sparkles className="icon-sm" /> Smart candidate matching
              </li>
            </ul>

            <button
              className="enter-btn employer-gradient"
              onClick={() => handleEnter("employer")}
            >
              Enter as Employer
            </button>
          </div>
        </div>

        <div className="stats">
          <div>
            <h3 className="stat-value purple">10K+</h3>
            <p>Active Jobs</p>
          </div>
          <div>
            <h3 className="stat-value pink">5K+</h3>
            <p>Companies</p>
          </div>
          <div>
            <h3 className="stat-value blue">50K+</h3>
            <p>Candidates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
