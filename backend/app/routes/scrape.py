from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from fastapi.responses import FileResponse, Response
from .. import schemas, scrape_script
from ..utils import excel_utils
import os

router = APIRouter(
    tags=['scrape']
)

@router.post('/scrape', status_code=status.HTTP_200_OK, response_class=FileResponse)
async def scrape(filters: schemas.Applied_filters, background_tasks: BackgroundTasks):
    file_path = "Scraped_jobs.xlsx"
    
    try:
        jobs = scrape_script.scrape_internshala_jobs(filters=filters)
        if not jobs:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Error fetching jobs for these filters. Please try again later."
            )
            
        excel_utils.create_excel_from_jobs(jobs, file_path=file_path)
        
        headers = {
            'Content-Disposition': f'attachment; filename={os.path.basename(file_path)}',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control_Allow-Methods": "POST, GET, OPTIONS",
        }
        async def remove_file(file_path):
            if os.path.exists(file_path):
                os.remove(file_path)

        response = FileResponse(
                file_path, 
                headers=headers,
        )
        # background task to remove the file after it has been downloaded
        background_tasks.add_task(remove_file, file_path)

        #returning the file as a response
        return response
    

    # finally: 
    #     async def remove_file():
    #         if os.path.exists(file_path):
    #             os.remove(file_path)
    #     asyncio.run(remove_file())
        
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error: {e}")

