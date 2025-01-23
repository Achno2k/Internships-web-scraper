import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaFileDownload } from "react-icons/fa";
import {
  CircularProgress,
  Autocomplete,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ErrorModal from "./ErrorModal";
import { profileOptions, locationOptions } from "../utils/dropDownUtils.js";
import {
  useFilterState,
  handleJobScraping,
  handleDownloadFile,
} from "../utils/filterPageUtils.js";
import "./FilterPage.css";
import { PreviewPage } from "./PreviewPage.jsx";

const FilterPage = () => {
  const { filters, handleChange, handleListChange } = useFilterState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState("");
  const [preview, setPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleJobScraping(filters, setLoading, setError, setJobs, setUserId, setPreview, setSuccess);
  };

  const handleDownload = () => {
    handleDownloadFile(userId, setBlobUrl, setSuccess);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-28 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-surface backdrop-blur-sm rounded-xl shadow-card p-8">
          <div className="flex items-center mb-6">
            <FaFilter className="text-2xl text-primary mr-3" />
            <h2 className="text-2xl font-semibold">Internship Filters</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Autocomplete
              multiple
              options={profileOptions}
              getOptionLabel={(option) => option}
              value={filters.profiles}
              onChange={(event, value) =>
                handleListChange(event, value, "profiles")
              }
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Profiles"
                  variant="outlined"
                  placeholder="e.g., Data Science"
                  className="bg-gray-50"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem
                  {...props}
                  key={option}
                  sx={{ justifyContent: "space-between" }}
                >
                  {option}
                  {selected && <CheckIcon color="info" />}
                </MenuItem>
              )}
            />

            <Autocomplete
              multiple
              options={locationOptions}
              getOptionLabel={(option) => option}
              value={filters.locations}
              onChange={(event, value) => handleListChange(event, value, "locations")}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Locations"
                  variant="outlined"
                  placeholder="e.g., Delhi"
                  className="bg-gray-50"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem
                  {...props}
                  key={option}
                  sx={{ justifyContent: "space-between" }}
                >
                  {option}
                  {selected && <CheckIcon color="info" />}
                </MenuItem>
              )}
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
            </div>
          </form>
          <ErrorModal error={error} onClose={() => setError("")} />
        </div>
      </div>
      <PreviewPage jobs={jobs} preview={preview} success={success} handleDownload={handleDownload}/>
    </motion.div>
  );
};

export default FilterPage;
