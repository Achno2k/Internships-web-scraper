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

