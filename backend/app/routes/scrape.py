from fastapi import APIRouter, HTTPException, status, BackgroundTasks, Query
from fastapi.responses import FileResponse
from typing import List
from uuid import uuid4
import os

from .. import schemas, scrape_script
from ..utils import excel_utils

router = APIRouter(
    tags=['scrape']
)

# jobs --> {user_id: jobs[]}
jobs: dict = {}

@router.post('/scrape', status_code=status.HTTP_200_OK, response_model=dict)
async def scrape(filters: schemas.Applied_filters):
    try:
        jobs_found = scrape_script.scrape_internshala_jobs(filters=filters)
        if not jobs_found:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Error fetching jobs for these filters. Please try again later."
            )
            
        # Generate user_id and store jobs in memory
        user_id: str = str(uuid4())
        jobs[user_id] = jobs_found
        return {"user_id": user_id, "jobs": jobs_found}
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error: {e}")

@router.get('/download')
async def download_file(user_id: str = Query(...), background_tasks: BackgroundTasks = BackgroundTasks()):
    # getting the new generated user_id as query parameters in order to download the excel sheet
    if user_id not in jobs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user_id or no jobs found for this user.")

    file_path = "ScrapedJobs.xlsx"
    try:
        user_jobs = jobs[user_id]
        excel_utils.create_excel_from_jobs(user_jobs, file_path=file_path)

        headers = {
            'Content-Disposition': f'attachment; filename={os.path.basename(file_path)}',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        }

        # Background task to clean up the file after download
        async def remove_file(file_path):
            if os.path.exists(file_path):
                os.remove(file_path)

        response = FileResponse(
            path=file_path,
            headers=headers,
        )
        background_tasks.add_task(remove_file, file_path)
        return response

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error downloading the Excel file: {e}")
