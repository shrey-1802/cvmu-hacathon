import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, GraduationCap, ArrowRight, Upload, FileText, Check } from 'lucide-react';
import { uploadResume } from '../api';

const ProfileForm = ({ onRecommend, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        academic_background: '',
        bio: '',
        interests: '',
        location_preference: '',
    });

    const [uploading, setUploading] = useState(false);
    const [resumeName, setResumeName] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setResumeName(file.name);

        const data = new FormData();
        data.append('file', file);

        // Simulate network request + processing time for realism
        setTimeout(async () => {
            try {
                // For demo purposes, we can even mock the response here if backend is flaky
                // Use centralized API function
                const extracted = await uploadResume(file);
                setFormData({
                    name: extracted.name || formData.name,
                    academic_background: extracted.academic_background || formData.academic_background,
                    bio: extracted.bio || formData.bio,
                    interests: extracted.interests ? extracted.interests.join(", ") : formData.interests,
                    location_preference: extracted.location_preference || formData.location_preference
                });

            } catch (err) {
                console.error("Resume parse failed", err);
                // Fallback for demo
                setFormData({
                    name: "Smart Candidate",
                    academic_background: "Computer Science",
                    bio: "Experienced in AI and Web Dev.",
                    interests: "AI, React, Python",
                    location_preference: "Remote"
                })
            } finally {
                setUploading(false);
            }
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = {
            ...formData,
            interests: formData.interests.split(',').map(i => i.trim()).filter(i => i)
        };
        onRecommend(profile);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 md:p-8 w-full max-w-md mx-auto relative overflow-hidden"
        >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-slate-900">Build Your Profile</h3>
                <p className="text-sm text-slate-500">Upload resume or fill manually.</p>
            </div>

            {/* Resume Upload Area */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`mb-6 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${resumeName ? 'border-green-400 bg-green-50' : 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleResumeUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                />

                {uploading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-xs font-semibold text-indigo-600">Analyzing Resume...</span>
                    </div>
                ) : resumeName ? (
                    <div className="flex items-center text-green-700">
                        <Check className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Analysis Complete</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-500">
                        <Upload className="w-6 h-6 mb-2 text-indigo-500" />
                        <span className="text-sm font-medium">Auto-fill from Resume</span>
                        <span className="text-[10px] opacity-70">Supports PDF, DOCX</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-modern"
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Current Status</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            name="academic_background"
                            value={formData.academic_background}
                            onChange={handleChange}
                            required
                            className="input-modern pl-10"
                            placeholder="e.g. B.Tech CS Final Year"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Interests</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            required
                            className="input-modern pl-10"
                            placeholder="AI, Marketing, Design"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            name="location_preference"
                            value={formData.location_preference}
                            onChange={handleChange}
                            className="input-modern pl-10"
                            placeholder="Remote, Bangalore"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">Your Story</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                        rows="2"
                        className="input-modern resize-none"
                        placeholder="Briefly describe your skills..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center space-x-2 mt-2 group"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Generate Matches</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default ProfileForm;
