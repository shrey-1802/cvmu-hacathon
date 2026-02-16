from pydantic import BaseModel
from typing import List, Optional

class CandidateProfile(BaseModel):
    name: str
    bio: str
    academic_background: str
    interests: List[str]
    location_preference: Optional[str] = None
    min_stipend: Optional[int] = 0
    duration_preference: Optional[str] = None # e.g. "2 Months"

class Internship(BaseModel):
    id: int
    title: str
    company: str
    location: str
    description: str # derived from combining title, company, location etc if desc is missing
    stipend: str
    duration: str
    start_date: str
    apply_by: str
    tags: List[str]
    apply_link: str
    match_score: Optional[float] = 0.0
    matched_keywords: Optional[List[str]] = []
