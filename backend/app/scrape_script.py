import requests
from bs4 import BeautifulSoup
from .utils import getURLParams
from fastapi import HTTPException, status

URL = "https://internshala.com"

def scrape_internshala_jobs(filters):
    """
    Scrapes job postings from Internshala, iterating over all available pages.
    """
    # url_params = getURLParams.get_URL_parameters([], [], False, False, False, False, 0)

    url_params: str = getURLParams.get_URL_parameters(
        filters.profiles, filters.locations, filters.intern_for_women, 
        filters.work_from_home, filters.part_time, filters.intern_ppo, 
        filters.stipend
    )

    base_url: str = URL + url_params
    print(f"Base URL: {base_url}")

    # fetching the first page in order to get the available pages
    response = requests.get(base_url)
    if response.status_code != 200:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error fetching response.")

    soup = BeautifulSoup(response.content, "html.parser")

    total_pages_span = soup.find(id ="total_pages")
    total_pages: int = int(total_pages_span.text.strip()) if total_pages_span else 1  # default to 1 page if not found
    # print(total_pages)

    jobs = []
    

    # Scraping maximum of 10 pages ensure efficiency and not overloading the server 
    max_pages: int = 10
    if total_pages < 10:
        max_pages = total_pages
    print (max_pages)

    for page in range(1, max_pages + 1):
        print (f"Fetching {page}..")
        page_url: str = f"{base_url}/page-{page}"
        response = requests.get(page_url)

        if response.status_code != 200:
            print(f"Failed to fetch page {page}. Skipping...")
            continue

        soup = BeautifulSoup(response.content, "html.parser")
        job_cards = soup.find_all("div", class_="internship_meta duration_meta")

        for job in job_cards:
            try:
                # Extracting job title
                title_element = job.find("a", class_="job-title-href")
                title: str = title_element.text.strip() if title_element else "Not available"

                # Extracting company name
                company_element = job.find("div", class_="heading_6 company_name").find("div", class_="company_and_premium").find("p", class_="company-name")
                company: str = company_element.text.strip() if company_element else "Not available"

                # Extracting the div with other information
                info_div = job.find("div", class_="detail-row-1")
                location, duration, stipend = "Not available", "Not available", "Not available"
                if info_div:
                    info_text = info_div.text.strip()
                    lines = [line.strip() for line in info_text.split("\n") if line.strip()]
                    if len(lines) > 0: location = lines[0]
                    if len(lines) > 1: duration = lines[1]
                    if len(lines) > 2: stipend = lines[2]

                    # print (location, duration, stipend)

                # Extracting the applying link
                link: str = job.find("a", class_="job-title-href")['href']
                # Extracting the time of when the job was posted
                posted_time = job.find("div", class_="detail-row-2").find("span").text.strip()

                # adding job details to the list
                jobs.append({
                    "Title": title,
                    "Company": company,
                    "Location": location,
                    "Duration": duration,
                    "Stipend": stipend,
                    "Link": URL + link,
                    "Posted_time": posted_time
                })

            except Exception as e:
                print(f"Error parsing job card: {e}")

    return jobs


if __name__ == "__main__":
    scraped_jobs = scrape_internshala_jobs()
    if isinstance(scraped_jobs, dict) and "error" in scraped_jobs:
        print(scraped_jobs["error"])
    else:
        for job in scraped_jobs:
            print(f"{job}\n")



