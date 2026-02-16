import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Github, Twitter, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';

import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import RecommendationsList from './components/RecommendationsList';
import SkeletonCard from './components/SkeletonCard';
import ErrorBoundary from './components/ErrorBoundary';
import { getRecommendations } from './api';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
          <Bot className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-slate-900">Intern<span className="text-indigo-600">Match</span>.ai</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium">
          Sign In
        </button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-slate-900">InternMatch.ai</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">
          The #1 AI-powered internship discovery platform for students.
        </p>
        <div className="flex space-x-4 pt-2">
          <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>

      <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><a href="#" className="hover:text-indigo-600">Features</a></li>
            <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
            <li><a href="#" className="hover:text-indigo-600">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><a href="#" className="hover:text-indigo-600">About</a></li>
            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
            <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
            <li><a href="#" className="hover:text-indigo-600">Security</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
      © 2026 InternMatch AI. All rights reserved.
    </div>
  </footer>
);

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRecommend = async (profile) => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    // Simulate AI delay
    const minTime = new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const [data] = await Promise.all([getRecommendations(profile), minTime]);
      setRecommendations(data);
      if (data.length === 0) {
        setError('No exact matches found. Try broader keywords!');
      } else {
        // Confetti effect on success
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#818cf8', '#c7d2fe'],
        });

        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } catch (err) {
      setError('Connection failed. Please check backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />

        <main>
          <Hero onRecommend={handleRecommend} loading={loading} />

          <div id="results-section">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="max-w-md mx-auto my-8 p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State or Results */}
            {(loading || recommendations.length > 0) && (
              <div className="py-12 bg-white" id="results-section">
                {loading ? (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
                      <div className="h-6 w-24 bg-slate-200 rounded-full animate-pulse" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <RecommendationsList recommendations={recommendations} />
                )}
              </div>
            )}
          </div>

          <Features />
          <HowItWorks />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
