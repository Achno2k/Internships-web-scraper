from pydantic import BaseModel
from typing import List

class Applied_filters(BaseModel):
    profiles: List[str] = []
    locations: List[str] = []
    intern_for_women: bool = False
    work_from_home: bool = False
    part_time: bool = False
    intern_ppo: bool = False
    stipend: int = 0

class ReturnedJobs(BaseModel):
    Title: str
    Company: str
    Location: str
    Duration: str
    Stipend: str
    Link: str
    Posted_time: str


class ReturnedJSON(ReturnedJobs):
    user_id: str
    jobs: List[ReturnedJobs]

    class Config():
        from_attributes = True


