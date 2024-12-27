export const scrapeJobs = async (filters) => {
    const profilesArray = filters.profiles
      ? filters.profiles.split(",").map((item) => item.trim())
      : [];
    const locationsArray = filters.locations
      ? filters.locations.split(",").map((item) => item.trim())
      : [];
  
    const finalFilters = {
      ...filters,
      profiles: profilesArray,
      locations: locationsArray,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFilters),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.detail || "Something went wrong");
      }
  
      const blob = await response.blob();
      return blob;
    } catch (err) {
      throw new Error(err.message || "An error occurred while fetching jobs.");
    }
  };
  