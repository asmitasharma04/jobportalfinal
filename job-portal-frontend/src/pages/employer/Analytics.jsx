import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { FaBriefcase, FaUserFriends, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Analytics.css";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error("❌ Error fetching analytics:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="analytics-container">Loading analytics...</div>;
  if (error) return <div className="analytics-container">{error}</div>;
  if (!analytics) return null;

  const COLORS = ["#16a34a", "#ff3d3d", "#6b21a8"];
  const statusData = [
    { name: "Accepted", value: analytics.accepted },
    { name: "Rejected", value: analytics.rejected },
    { name: "Pending", value: analytics.pending },
  ];

  const summaryStats = [
    { title: "Total Jobs", value: analytics.totalJobs, icon: <FaBriefcase /> },
    { title: "Total Applicants", value: analytics.totalApplicants, icon: <FaUserFriends /> },
    { title: "Accepted", value: analytics.accepted, icon: <FaCheckCircle /> },
    { title: "Rejected", value: analytics.rejected, icon: <FaTimesCircle /> },
  ];

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Employer Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        {summaryStats.map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="icon">{stat.icon}</div>
            <div className="details">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-wrapper">
        <div className="chart-box">
          <h3>Total Applicants per Job</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.applicantsPerJob}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applicants" fill="#6b21a8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Applications Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}