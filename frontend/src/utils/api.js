export const scrapeJobs = async (filters) => {
  try {
    // Backend hosted on AWS EC2 instance
    // Backend hosted URL for production - https://api.internscraper.achno2k.xyz/scrape
    const response = await fetch("https://api.internscraper.achno2k.xyz/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.detail || "Something went wrong");
    }

    const res_jobs = await response.json();
    // console.log("got the jobs json from the backend");
    return res_jobs;
  } catch (err) {
    throw new Error(err.message || "An error occurred while fetching jobs.");
  }
};

export const downloadExcelFile = async (userId) => {
  try {
    const response = await fetch(`https://api.internscraper.achno2k.xyz/download?user_id=${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to download the Excel file.");
    }
    const blob = await response.blob();
    console.log("Successfully fetched the binary file.");
    return blob;
  } catch (err) {
    throw new Error(err.message || "An error occurred while downloading the Excel file.");
  }
};
