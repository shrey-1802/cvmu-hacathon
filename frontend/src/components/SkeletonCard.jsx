import { motion } from 'framer-motion';

const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg animate-pulse" />
            <div className="w-16 h-5 bg-slate-100 rounded-full animate-pulse" />
        </div>

        <div className="w-3/4 h-6 bg-slate-100 rounded mb-2 animate-pulse" />
        <div className="w-1/2 h-4 bg-slate-100 rounded mb-6 animate-pulse" />

        <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center">
                <div className="w-4 h-4 bg-slate-100 rounded mr-2 animate-pulse" />
                <div className="w-1/3 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-slate-100 rounded mr-2 animate-pulse" />
                <div className="w-1/4 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 bg-slate-100 rounded mr-2 animate-pulse" />
                <div className="w-1/3 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-50">
            <div className="flex justify-between mb-2">
                <div className="w-20 h-3 bg-slate-100 rounded animate-pulse" />
                <div className="w-12 h-4 bg-slate-100 rounded-full animate-pulse" />
            </div>
            <div className="flex gap-2">
                <div className="w-12 h-4 bg-slate-100 rounded animate-pulse" />
                <div className="w-16 h-4 bg-slate-100 rounded animate-pulse" />
                <div className="w-10 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
        </div>

        <div className="mt-6 w-full h-10 bg-slate-100 rounded-lg animate-pulse" />
    </div>
);

export default SkeletonCard;
