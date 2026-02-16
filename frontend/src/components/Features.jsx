import { motion } from 'framer-motion';
import { Cpu, Target, Zap } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Cpu className="w-8 h-8 text-indigo-600" />,
            title: "AI Smart Matching",
            description: "Our neural networks analyze thousands of data points to find roles that fit your unique profile."
        },
        {
            icon: <Target className="w-8 h-8 text-blue-600" />,
            title: "Skill-Based",
            description: "Forget generic keywords. We match based on your actual skills, projects, and academic background."
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            title: "Instant Results",
            description: "Get a personalized list of opportunities in milliseconds. No more waiting for recruiters."
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
