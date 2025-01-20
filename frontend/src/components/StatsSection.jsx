import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBuilding, FaGlobe } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    { icon: <FaUsers />, value: '100+', label: 'Active Users' },
    { icon: <FaBuilding />, value: '10+', label: 'Companies' },
    { icon: <FaGlobe />, value: '20+', label: 'Countries' },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-4xl text-primary mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 