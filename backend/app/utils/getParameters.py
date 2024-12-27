def select_categories(category_list):
    if category_list == []:
        return ""
    
    final_params = []
    for category in category_list:
        category = category.strip()
        if '/' in list(category):
            category = category.replace('/','%2F')
            final_params.append(category.split(' ')[0])
        else:
            category = category.replace(' ','%20')
            final_params.append(category)

    final_params = ','.join(final_params)
    final_params+='-internship'
    return final_params

def select_locations(location_list):
    if location_list == []:
        return ""
    
    final_params = []
    for location in location_list:
        location = location.strip()
        location = location.replace(' ','%20')
        final_params.append(location)
    final_params = ','.join(final_params)
    final_params ='-in-'+final_params

    return final_params

# print (select_categories(["Web_Development", "Sofware Development"]))
# print ()
# print (select_locations(["Delhi", "Mumbai"]))
