import pandas as pd
import os

def create_excel_from_jobs(jobs, file_path):
   if not jobs:
       raise ValueError("No jobs data available to create the Excel file.")
       
   df = pd.DataFrame(jobs)
   
   try:
       with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
           df.to_excel(writer, index=False, sheet_name="Jobs")
           
           worksheet = writer.sheets["Jobs"]
           
           # Bold headers and set column widths
           for idx, column in enumerate(df.columns):
               column_letter = chr(65 + idx)
               worksheet.column_dimensions[column_letter].width = max(len(str(val)) for val in df[column]) + 6
               
               # Bold header
               header_cell = worksheet[f"{column_letter}1"]
               header_cell.font = header_cell.font.copy(bold=True)
               
           # Center align all cells    
           for row in worksheet.iter_rows():
               for cell in row:
                   cell.alignment = cell.alignment.copy(
                       horizontal='left',
                       vertical='center'
                   )
                   
   except Exception as e:
       raise ValueError(f"Failed to create Excel file: {e}")
       
   if not os.path.exists(file_path):
       raise RuntimeError(f"File at path {file_path} does not exist.")