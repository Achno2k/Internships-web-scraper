import React, { useState } from "react";
import { scrapeJobs } from "../utils/api.js";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TuneIcon from "@mui/icons-material/Tune";
import "./FilterPage.css";

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
    <div className="filter-page-container">
      <TuneIcon className="filter-icon" style={{ display: "inline-block" }} />
      <h2 style={{ display: "inline-block" }}>Filters</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          className="form-field"
          label="Profiles"
          name="profiles"
          value={filters.profiles}
          onChange={handleChange}
          variant="outlined"
          placeholder="e.g., Web Development, Data Science"
        />
        <br />
        <TextField
          className="form-field"
          label="Locations"
          name="locations"
          value={filters.locations}
          onChange={handleChange}
          variant="outlined"
          placeholder="e.g., Bangalore, Mumbai"
        />
        <br />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="workFromHome"
                checked={filters.workFromHome}
                onChange={handleChange}
              />
            }
            label="Work from Home"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="partTime"
                checked={filters.partTime}
                onChange={handleChange}
              />
            }
            label="Part Time"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="internWomen"
                checked={filters.internWomen}
                onChange={handleChange}
              />
            }
            label="Internship for Women"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="internPpo"
                checked={filters.internPpo}
                onChange={handleChange}
              />
            }
            label="Internship with PPO"
          />
        </FormGroup>

        <br />
        <TextField
          className="form-field"
          label="Stipend"
          name="stipend"
          type="number"
          value={filters.stipend}
          onChange={handleChange}
          variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          {loading ? "Loading..." : "Apply Filters"}
        </Button>

        {blobUrl && (
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "10px" }}
            onClick={handleDownload}
          >
            Download Excel File
          </Button>
        )}
      </form>

      {error && (
        <p className="message" style={{ color: "#D91E31" }}>
          {error}
        </p>
      )}
      {success && (
        <p className="message" style={{ color: "#037171" }}>
          File has been downloaded successfully!
        </p>
      )}
    </div>
  );
};
export default FilterPage;
