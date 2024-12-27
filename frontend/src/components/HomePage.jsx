import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Internship Scraper</h1>
      <p>Your tool for finding internships easily.</p>
      <Link to="/filters">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
