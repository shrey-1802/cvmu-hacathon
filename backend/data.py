import pandas as pd
from typing import List
from models import Internship
import os

CSV_PATH = os.path.join(os.path.dirname(__file__), "interships.csv.csv")

def get_all_internships() -> List[Internship]:
    if not os.path.exists(CSV_PATH):
        # Fallback to empty or mock if CSV missing, but we expect it now
        return []
    
    # Read CSV with proper encoding
    try:
        df = pd.read_csv(CSV_PATH, encoding='utf-8')
    except UnicodeDecodeError:
        df = pd.read_csv(CSV_PATH, encoding='latin1')
        
    # Column names based on user file:
    # ,Job Title,Job Type,Company Name,Posted Date,Cities,States,Stipend,Start Date,Duration,Numer of Openings,Late date to apply
    
internships = []
    
    for idx, row in df.iterrows():
        # Handle nan values gracefully
        title = str(row.get("Job Title", "Unknown Role") if "Job Title" in row else "Unknown Role") if pd.notna(row.get("Job Title")) else "Unknown Role"
        company = str(row.get("Company Name", "Unknown Company") if "Company Name" in row else "Unknown Company") if pd.notna(row.get("Company Name")) else "Unknown Company"
        city = str(row.get("Cities", "") if "Cities" in row else "") if pd.notna(row.get("Cities")) else ""
        state = str(row.get("States", "") if "States" in row else "") if pd.notna(row.get("States")) else ""
        location = f"{city}, {state}".strip(", ")
        stipend = str(row.get("Stipend", "Unpaid") if "Stipend" in row else "Unpaid") if pd.notna(row.get("Stipend")) else "Unpaid"
        duration = str(row.get("Duration", "Not specified") if "Duration" in row else "Not specified") if pd.notna(row.get("Duration")) else "Not specified"
        start_date = str(row.get("Start Date", "Immediately") if "Start Date" in row else "Immediately") if pd.notna(row.get("Start Date")) else "Immediately"
        apply_by = str(row.get("Late date to apply", "ASAP") if "Late date to apply" in row else "ASAP") if pd.notna(row.get("Late date to apply")) else "ASAP"
        
        # Create a synthetic description for matching since CSV has no description
        # We emphasize important keywords
        description = f"{title} internship at {company}. Located in {location}. Duration: {duration}. Stipend: {stipend}. Apply by {apply_by}."
        
        # Simple tag extraction
        tags = []
        if city and city != "nan": tags.append(city)
        if state and state != "nan": tags.append(state)
        
        lower_title = title.lower()
        if "engineer" in lower_title: tags.append("Engineering")
        if "marketing" in lower_title: tags.append("Marketing")
        if "manager" in lower_title or "management" in lower_title: tags.append("Management")
        if "social" in lower_title: tags.append("Social Work")
        if "data" in lower_title: tags.append("Data")
        if "design" in lower_title: tags.append("Design")
        if "finance" in lower_title: tags.append("Finance")
        
        # Ensure ID is an int
        internship_id = int(idx)
        
        # Generate a direct search link to the PM Internship Portal
        # Since we don't have exact URLs, we point to the portal
        apply_link = "https://pminternship.mca.gov.in/login"

        internships.append(Internship(
            id=internship_id,
            title=title,
            company=company,
            location=location,
            description=description,
            stipend=stipend,
            duration=duration,
            start_date=start_date,
            apply_by=apply_by,
            tags=tags,
            apply_link=apply_link
        ))
        
    return internships