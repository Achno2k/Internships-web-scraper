import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaDownload } from 'react-icons/fa';
import StatsSection from './StatsSection';

const HomePage = () => {
  const features = [
    {
      icon: <FaSearch className="text-4xl text-primary" />,
      title: "Smart Filtering",
      description: "Find internships that match your exact preferences"
    },
    {
      icon: <FaBriefcase className="text-4xl text-primary" />,
      title: "Multiple Platforms",
      description: "Search across various internship platforms"
    },
    {
      icon: <FaDownload className="text-4xl text-primary" />,
      title: "Easy Export",
      description: "Download results in Excel format"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-28 text-center"
      >
        <h1 className="text-5xl pt-10 font-bold text-gray-800 mb-6">
          Find Your Perfect Internship
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Powerful scraping tool to discover internships across multiple platforms
        </p>
        <Link to="/filters">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold
                     hover:bg-primary-dark transition duration-300"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-surface backdrop-blur-sm p-6 rounded-xl shadow-card hover:shadow-hover
                          transition duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <StatsSection />
    </div>
  );
};

export default HomePage;
