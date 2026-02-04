import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
    {
        id: '1',
        title: 'Generative AI for Business',
        description: 'Transform your workflow with large language models and prompt engineering.',
        category: 'AI Strategy',
        level: 'Beginner',
        duration: '6 Weeks',
        students: '1.2k',
        rating: '4.9',
        price: '$199',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '2',
        title: 'Deep Learning Mastery',
        description: 'Build and deploy neural networks using PyTorch and TensorFlow for production.',
        category: 'Engineering',
        level: 'Advanced',
        duration: '12 Weeks',
        students: '850',
        rating: '4.8',
        price: '$349',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        title: 'Cloud Native AI Ops',
        description: 'Scale AI models in the cloud with Kubernetes and MLOps best practices.',
        category: 'Infrastructure',
        level: 'Intermediate',
        duration: '8 Weeks',
        students: '500',
        rating: '4.7',
        price: '$279',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    }
];

export const EduCoursesSection = () => {
    return (
        <section id="courses" className="py-24 sm:py-32 px-6 bg-slate-50">
            <div className="container mx-auto max-w-7xl">

                {/* Section Header matching Hanu UI */}
                <div className="text-center mb-16 sm:mb-20 space-y-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.1em] rounded-full">
                        What We Offer
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Comprehensive <span className="text-primary">AI Training</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Corporate-grade AI education curriculums designed to modernize your skills and unlock new career possibilities.
                    </p>
                </div>

                {/* Responsive Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group h-full flex flex-col bg-white border border-slate-200 rounded-[1.25rem] overflow-hidden hover:translate-y-[-8px] hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                                {/* Image Placeholder */}
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20" />
                                    </div>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-none shadow-sm backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest z-20">
                                        {course.category}
                                    </Badge>
                                </div>

                                <div className="p-8 flex flex-col flex-grow space-y-6">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" /> {course.duration}
                                        </span>
                                        <span className="bg-slate-50 px-2 py-1 rounded-md">{course.level}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400">
                                            <span className="flex items-center">
                                                <Users className="w-4 h-4 mr-1.5" /> {course.students}
                                            </span>
                                            <span className="flex items-center text-yellow-500">
                                                <Star className="w-4 h-4 mr-1.5 fill-yellow-500" /> {course.rating}
                                            </span>
                                        </div>
                                        <span className="text-2xl font-black text-slate-900">{course.price}</span>
                                    </div>

                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Link */}
                <div className="mt-16 text-center">
                    <Button variant="outline" className="h-12 px-8 rounded-full border-slate-200 text-slate-600 font-semibold hover:bg-slate-50" asChild>
                        <Link to="/academy/catalog">
                            Browse Full Catalog
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
