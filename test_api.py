import requests
import json

url = "http://localhost:8000/recommend"
payload = {
    "name": "Test User",
    "bio": "I am a student interested in AI and Data Science.",
    "academic_background": "Computer Science",
    "interests": ["AI", "Data"],
    "location_preference": "Remote"
}
headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
