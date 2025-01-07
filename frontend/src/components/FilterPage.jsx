import { useState } from "react";
import { scrapeJobs } from "../utils/api.js";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./FilterPage.css";
import { motion } from 'framer-motion';
import { FaFilter, FaFileDownload } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';
import ErrorModal from './ErrorModal';

const FilterPage = () => {
  const [filters, setFilters] = useState({
    profiles: "",
    locations: "",
    workFromHome: false,
    partTime: false,
    internWomen: false,
    internPpo: false,
    stipend: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setBlobUrl("");

    try {
      const blob = await scrapeJobs(filters);
      const url = window.URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle download when the button is clicked
  const handleDownload = () => {
    if (blobUrl) {
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "scraped_jobs.xlsx"; 
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl); 
      setTimeout(() => {
        setSuccess(true)
        setBlobUrl("");
      }, 2000); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-28 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface backdrop-blur-sm rounded-xl shadow-card p-8">
          <div className="flex items-center mb-6">
            <FaFilter className="text-2xl text-primary mr-3" />
            <h2 className="text-2xl font-semibold">Internship Filters</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Profiles"
              name="profiles"
              value={filters.profiles}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g., Web Development, Data Science"
              className="bg-gray-50"
            />

            <TextField
              fullWidth
              label="Locations"
              name="locations"
              value={filters.locations}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g., Bangalore, Mumbai"
              className="bg-gray-50"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.workFromHome}
                    onChange={handleChange}
                    name="workFromHome"
                    color="primary"
                  />
                }
                label="Work from Home"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.partTime}
                    onChange={handleChange}
                    name="partTime"
                    color="primary"
                  />
                }
                label="Part Time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.internWomen}
                    onChange={handleChange}
                    name="internWomen"
                    color="primary"
                  />
                }
                label="Internships for Women"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.internPpo}
                    onChange={handleChange}
                    name="internPpo"
                    color="primary"
                  />
                }
                label="Internships for PPO"
              />
            </div>

            <TextField
              fullWidth
              label="Minimum Stipend"
              name="stipend"
              type="number"
              value={filters.stipend}
              onChange={handleChange}
              variant="outlined"
              className="bg-gray-50"
            />

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <FaFilter className="mr-2" />
                    Apply Filters
                  </>
                )}
              </motion.button>

              {blobUrl && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="bg-secondary text-white px-6 py-2 rounded-lg flex items-center"
                >
                  <FaFileDownload className="mr-2" />
                  Download Results
                </motion.button>
              )}
            </div>
          </form>

          <ErrorModal error={error} onClose={() => setError("")} />

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg"
            >
              File downloaded successfully!
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPage;
