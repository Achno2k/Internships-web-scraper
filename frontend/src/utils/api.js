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
      // Backend hosted on AWS EC2 instance
      const response = await fetch("https://api.internscraper.achno2k.xyz/scrape", {
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
      console.log ("Successfully got the binary encoded excel file");
      return blob;
    } catch (err) {
      throw new Error(err.message || "An error occurred while fetching jobs.");
    }
  };
  