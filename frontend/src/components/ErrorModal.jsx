import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const ErrorModal = ({ error, onClose }) => {
  return (
    <AnimatePresence>
      {error && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-white rounded-xl p-6 shadow-xl z-50 w-11/12 max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-red-600">
                <FaExclamationTriangle className="text-2xl mr-2" />
                <h3 className="text-xl font-semibold">Error</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal; 