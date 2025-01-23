import { useState } from "react";
import { scrapeJobs, downloadExcelFile } from "./api";
export const useFilterState = () => {
  const [filters, setFilters] = useState({
    profiles: [],
    locations: [],
    workFromHome: false,
    partTime: false,
    internWomen: false,
    internPpo: false,
    stipend: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleListChange = (event, value, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return { filters, setFilters, handleChange, handleListChange };
};

export const handleJobScraping = async (filters, setLoading, setError, setJobs, setUserId, setPreview, setSuccess) => {
  setLoading(true);
  setError("");
  setSuccess(false);
  try {
    const res_jobs = await scrapeJobs(filters);
    // console.log(res_jobs.jobs)
    setJobs(res_jobs.jobs)      
    setUserId(res_jobs.user_id)
    setPreview(true)
  } catch (err) {
    setError(err.message || "Failed to scrape jobs. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const handleDownloadFile = async (userId, setBlobUrl, setSuccess) => {
  try {
    const blob = await downloadExcelFile(userId);
    const blobUrl = window.URL.createObjectURL(blob);
    setBlobUrl(blobUrl);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${userId}.xlsx`; 
    document.body.appendChild(link); 
    link.click();
    link.remove(); 
    window.URL.revokeObjectURL(blobUrl);

    setTimeout(() => {
      setSuccess(true);
      setBlobUrl(""); 
    }, 1500);
    
  } catch (err) {
    console.error("Error downloading file:", err.message);
    throw new Error(err.message || "Something went wrong while downloading the Excel file.");
  }
};
