import React from "react";
import "./Footer.css";
import githubLogo from "../assets/github.png";
import linkedinLogo from "../assets/linkedin.png";
import instagramLogo from "../assets/instagram.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-contact">
          <p>Contact : <a href="mailto:amansighh525@gmail.com">amansighh525@gmail.com</a></p>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/Achno2k" target="_blank" rel="noreferrer">
            <div className="icon-wrapper">
              <img src={githubLogo} alt="GitHub" className="social-icon" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/amansingh0612/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon-wrapper">
              <img src={linkedinLogo} alt="LinkedIn" className="social-icon" />
            </div>
          </a>
          <a
            href="https://www.instagram.com/amansingh0612/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon-wrapper">
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </div>
          </a>
        </div>
        <div className="footer-made">
          <p>
            Made with ❤️ by Aman Singh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
