import axios from 'axios';

const API_URL = "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getRecommendations = async (profile) => {
    try {
        const response = await api.post('/recommend', profile);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post('/upload_resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Resume Upload Error:", error);
        throw error;
    }
};
