import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EduHeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-24 sm:pt-32 pb-12 sm:pb-24">
            {/* Background Mask/Glow as seen in Hanu UI */}
            <div className="absolute top-0 right-[-10%] w-[60%] h-full opacity-[0.15] pointer-events-none bg-radial-primary animate-float" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col space-y-8 text-left"
                    >
                        {/* Badge */}
                        <div>
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-full">
                                Future-Proof Your Career
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                            Unlock the Power of <br />
                            <span className="text-primary">AI Excellence</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                            Hanu Edu delivers world-class AI and technology training designed for the next generation of innovators. Corporate-grade learning, personalized for you.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white font-bold h-16 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all group" asChild>
                                <Link to="/academy/catalog">
                                    Explore Courses
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold" asChild>
                                <Link to="/enroll">
                                    <GraduationCap className="mr-2 w-5 h-5" />
                                    Join Academy
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof area matching Hanu UI */}
                        <div className="pt-12 border-t border-slate-100">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                Trusted by industry leaders
                            </p>
                            <div className="flex gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 w-auto" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6 w-auto" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6 w-auto" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:flex justify-center"
                    >
                        <div className="relative w-full max-w-[550px] aspect-square rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-slate-100 flex items-center justify-center overflow-hidden">
                            {/* Decorative elements matching Hanu UI style */}
                            <div className="absolute w-[80%] h-[80%] border border-primary/10 rounded-full animate-rotate-slow" />
                            <div className="absolute w-[60%] h-[60%] border border-secondary/10 rounded-full animate-rotate-reverse" />
                            <Sparkles className="w-32 h-32 text-primary/20 animate-pulse-glow" />

                            {/* Main Image placeholder */}
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                                alt="AI Learning Platform"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
                            />
                        </div>

                        {/* Float Cards (Floating UI as seen in Hanu UI styles) */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4"
                        >
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Success Rate</p>
                                <p className="text-lg font-bold text-slate-900">98.5%</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4"
                        >
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Students</p>
                                <p className="text-lg font-bold text-slate-900">12k+</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
