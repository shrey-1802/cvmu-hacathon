import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        { num: "01", title: "Fill Your Profile", desc: "Share your skills, bio, and interests." },
        { num: "02", title: "AI Analysis", desc: "Our engine processes your data." },
        { num: "03", title: "Get Matches", desc: "Apply to your top-rated roles." }
    ];

    return (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="inline-block mb-12">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Simple Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How It Works</h2>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="flex-1 relative bg-slate-50 md:bg-transparent p-4 md:p-0 z-10 w-full">
                            <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-3xl font-black text-indigo-600 mb-6">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-500">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
