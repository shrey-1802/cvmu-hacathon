from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
from models import Internship, CandidateProfile

class InternshipRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.internships = []
        self.tfidf_matrix = None

    def fit(self, internships: List[Internship]):
        self.internships = internships
        # Create a "soup" of text metadata for each internship
        # Weighting title and tags slightly more by repeating them
        corpus = [
            f"{i.title} {i.title} {i.company} {' '.join(i.tags)} {' '.join(i.tags)} {i.description}"
            for i in internships
        ]
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)

    def recommend(self, profile: CandidateProfile, top_k: int = 3) -> List[Internship]:
        if not self.internships:
            return []
        
        # Create query soup from profile
        # Weighting interests heavily to match tags
        interests_str = " ".join(profile.interests)
        query_soup = f"{profile.bio} {profile.academic_background} {interests_str} {interests_str} {interests_str}"
        
        if profile.location_preference:
             query_soup += f" {profile.location_preference}"

        query_vec = self.vectorizer.transform([query_soup])
        
        # Calculate cosine similarity
        cosine_sim = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        # Get indices of top_k results
        # argsort returns indices that would sort the array, in ascending order
        # so we take the last top_k and reverse them
        top_indices = cosine_sim.argsort()[-top_k:][::-1]
        
        recommendations = []
        for idx in top_indices:
            score = float(cosine_sim[idx])
            # simple threshold to avoid completely irrelevant results
            if score > 0.05: 
                internship = self.internships[idx].model_copy()
                internship.match_score = round(score * 100, 1) # Convert to percentage
                
                # Identify matched keywords (basic intersection for demo)
                # In a real system, we'd use attention weights from the model
                profile_keywords = set([k.lower() for k in profile.interests] + profile.bio.lower().split())
                internship_keywords = set([t.lower() for t in internship.tags] + internship.description.lower().split())
                
                # Find intersection ignoring common stopwords (simplified)
                common = profile_keywords.intersection(internship_keywords)
                # Filter out very short words to make it look "smart"
                smart_keywords = [w for w in common if len(w) > 3]
                internship.matched_keywords = list(smart_keywords)[:5] # Top 5 matches
                
                recommendations.append(internship)
                
        return recommendations