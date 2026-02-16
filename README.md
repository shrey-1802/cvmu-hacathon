# InternMatch.ai - AI-Powered Internship Matching Platform

An intelligent internship discovery platform that uses machine learning to match students with their perfect internships.

## Features

- 🤖 **AI-Powered Matching**: TF-IDF based recommendation engine
- 📄 **Resume Upload**: Auto-fill profile from PDF/DOCX resumes
- 🎯 **Match Explainability**: See why each internship matches your profile
- 🎉 **Confetti Celebrations**: Engaging user experience
- ⚡ **Skeleton Loading**: Smooth loading animations
- 📊 **Real-time Analysis**: Instant recommendations based on your profile

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- Canvas Confetti
- Axios

### Backend
- FastAPI
- Scikit-learn (ML)
- Pandas
- Python Multipart (file uploads)

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. Visit `http://localhost:5173`
2. Upload your resume or fill the profile form manually
3. Click "Generate Matches"
4. View personalized internship recommendations with match scores
5. Apply to internships directly

## Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── recommender.py       # ML recommendation engine
│   ├── data.py              # Data loading utilities
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api.js          # API client
│   │   └── App.jsx         # Main application
│   └── package.json        # Node dependencies
└── README.md
```

## License

MIT License
