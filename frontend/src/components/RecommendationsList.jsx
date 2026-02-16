import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Clock, Building2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const RecommendationsList = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) return null;

    const handleApply = (e) => {
        // Trigger confetti from the click position
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#4f46e5', '#818cf8', '#c7d2fe'],
            disableForReducedMotion: true
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Your AI Matches</h2>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">
                    {recommendations.length} Results
                </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((internship, index) => (
                    <motion.div
                        key={internship.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                                <Building2 className="w-5 h-5 text-indigo-600" />
                            </div>
                            {index === 0 && (
                                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                                    Top Match
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                            {internship.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium mb-4">{internship.company}</p>

                        <div className="space-y-2 mb-6 flex-1">
                            <div className="flex items-center text-sm text-slate-600">
                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                <span className="truncate">{internship.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                <span className="truncate">{internship.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                                <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                                <span className="truncate font-semibold text-slate-800">{internship.stipend}</span>
                            </div>

                            {/* Match Explanation */}
                            {internship.match_score && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Why you matched</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${internship.match_score >= 80 ? 'bg-green-100 text-green-700' :
                                                internship.match_score >= 60 ? 'bg-indigo-100 text-indigo-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {internship.match_score}% Match
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {internship.matched_keywords && internship.matched_keywords.map((keyword, i) => (
                                            <span key={i} className="text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {internship.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={internship.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleApply}
                            className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-md shadow-indigo-100 cursor-pointer"
                        >
                            Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsList;
