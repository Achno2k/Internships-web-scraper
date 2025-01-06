import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaFilter, FaGithub } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
            </motion.div>
            <span className="font-bold text-xl text-primary">InternScraper</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/filters"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                location.pathname === '/filters' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaFilter />
              <span>Filters</span>
            </Link>
            <a
              href="https://github.com/achno2k/Internships-web-scraper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 