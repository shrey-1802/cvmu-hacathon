import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, PlayCircle } from 'lucide-react';
import ProfileForm from './ProfileForm';

const Hero = ({ onRecommend, loading }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-gradient-to-b from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-gradient-to-t from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                            <span className="text-sm font-semibold text-indigo-900 tracking-wide">AI-Powered Matching V2.0</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            Find Your Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Internship with AI
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Empowering students to discover personalized internships using advanced AI algorithms. Stop searching, start matching.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button onClick={() => document.getElementById('hero-form').scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full sm:w-auto">
                                Generate Matches
                            </button>
                            <button className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                                <PlayCircle className="w-5 h-5 text-slate-400" />
                                How It Works
                            </button>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Free for Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Real-time Analysis</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Form */}
                    <div id="hero-form" className="flex-1 w-full max-w-md lg:max-w-full">
                        <div className="relative">
                            {/* Decorative blobs behind form */}
                            <div className="absolute top-10 -right-10 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-60 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200 rounded-full blur-xl opacity-60" />

                            <ProfileForm onRecommend={onRecommend} loading={loading} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
