
# Internships Web Scraper

A powerful and customizable web scraping tool designed to fetch job and internship postings from platforms like LinkedIn and Internshala. The scraped data is exported to an Excel file for easy access, and the tool features a modern frontend interface for setting filters and initiating the scraping process.




## Features

- **Filter Options**:
    - Profiles (e.g., Web Development, Data Science)
    - Locations
    - Work From Home
    - Part Time Internships
    - Internships for Women
    - Internships with PPO
    - Minimum Stipend

- **Excel Export**: Scraped data is downloaded as an Excel file.

- **Modern UI**: Minimal and responsive frontend built with React.

- **Backend**: Efficient scraping logic implemented in FastAPI.

- **Deployment-Ready**: Suitable for deployment on AWS EC2, Vercel, or other hosting platforms.




## Tech Stack

### Frontend

- **React**: For building the user interface.
- **Material UI**: For modern and responsive components.

### Backend

- **FastAPI**: Lightweight and efficient Python framework for API development.
- **BeautifulSoup**: For web scraping.
- **Pandas**: For data processing and exporting to Excel.

### Deployment

- **Frontend**: Suitable for deployment on platforms like Vercel.
- **Backend**: Hosted on AWS EC2 with NGINX and Gunicorn.




## Getting Started

### Prerequisites
- **Node.js** (for running the frontend)
- **Python 3.9+** (for running the backend)
- **AWS EC2 instance** (for deployment, optional)


## Installation

-  Clone the repository:

```bash
    git clone https://github.com/achno2k/Internships-web-scraper.git
    cd internships-web-scraper
```
- Frontend Setup
```bash
    cd frontend
    npm install
    npm run dev
```
- Backend Setup

```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn app.main:app --reload
```
- Access
    - Frontend : http://localhost:3000
    - Backend : http://localhost:8000

## Folder Structure

```bash
.
├── frontend          # React frontend
    |-- public
    |-- src
        |-- assets
        |-- components
        |-- utils
        |-- App.jsx
        |-- main.jsx
    |-- index.html
├── backend           # FastAPI backend
    |-- .venv
    |-- app
        |-- routes
        |-- utils
        |-- main.py
        |-- schemas.py
        |-- scrape_script.py
    |-- requirements.txt
├── .gitignore
└── README.md         # Project documentation
```

## Future Improvements

- Add more scraping platforms.
- Implement user authentication for saved preferences.
- Introduce AI-based filtering for smarter recommendations.
## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch (feature/new-feature).
- Commit your changes and push.
- Submit a pull request.


## License

This project is licensed under [MIT License](https://choosealicense.com/licenses/mit/).


## Contact
- Author: Aman Singh
- Email: amansinghh525@gmail.com
- Socials:
    - [LinkedIn](https://www.linkedin.com/in/amansingh0612/)
    - [Github](https://www.github.com/achno2k)

Made with ❤ by Aman Singh