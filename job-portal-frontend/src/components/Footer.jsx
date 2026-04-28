import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <p>© 2025 Job Portal | All Rights Reserved</p>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="#features">Features</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank"><FaLinkedinIn /></a>
        <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
      </div>

      <div className="footer-contact">
        <p>Email: support@jobportal.com | Phone: +91 12345 67890</p>
        <p>123 Career Street, New Delhi, India</p>
      </div>
    </footer>
  );
}
