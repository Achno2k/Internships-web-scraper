from typing import List, Optional
from . import getParameters as gp

def get_URL_parameters(profiles: Optional[List[str]] = None, 
                       locations: Optional[List[str]] = None, 
                       intern_for_women: bool = None, work_from_home: bool = None, 
                       part_time: bool = None, intern_ppo: bool = None, 
                       stipend: int = None) -> str:
    URL_PARAMS = ""

    if intern_for_women == True:
        URL_PARAMS += '/internships-for-women/'
    else:
        URL_PARAMS += '/internships/'

    if work_from_home == True:
        URL_PARAMS += 'work-from-home-'

    URL_PARAMS += gp.select_categories(category_list=profiles)
    URL_PARAMS += gp.select_locations(location_list=locations)

    if part_time == True:
        URL_PARAMS += '/part-time-true'

    if intern_ppo ==True:
        URL_PARAMS += '/ppo-true'

    if stipend:
        URL_PARAMS += f'/stipend-{stipend}'

    if work_from_home == True or part_time == True:
        URL_PARAMS = URL_PARAMS.replace('-internship', '-jobs')
    

    return URL_PARAMS

# print (get_URL_parameters(['web-development', 'software-development'], ['Delhi', 'Mumbai'], False, True, True, False, 8000))


    