import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Users, Star, BookOpen, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const AcademyCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock course data
  const courses = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning, including supervised and unsupervised learning algorithms.',
      category: 'AI & Machine Learning',
      level: 'Beginner',
      duration: '8 weeks',
      students: 1247,
      rating: 4.8,
      price: 299,
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      tags: ['Python', 'Scikit-learn', 'Data Science'],
      lessons: 24,
      isEnrolled: false
    },
    {
      id: '2',
      title: 'Advanced React Development',
      description: 'Master advanced React concepts including hooks, context, performance optimization, and testing.',
      category: 'Web Development',
      level: 'Advanced',
      duration: '6 weeks',
      students: 892,
      rating: 4.9,
      price: 399,
      instructor: 'Marcus Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      tags: ['React', 'JavaScript', 'Frontend'],
      lessons: 32,
      isEnrolled: true
    },
    {
      id: '3',
      title: 'UX Design Fundamentals',
      description: 'Learn user experience design principles, research methods, and design thinking processes.',
      category: 'Design',
      level: 'Beginner',
      duration: '4 weeks',
      students: 567,
      rating: 4.7,
      price: 199,
      instructor: 'Elena Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=800',
      tags: ['UX', 'Design Thinking', 'Figma'],
      lessons: 18,
      isEnrolled: false
    },
    {
      id: '4',
      title: 'Cloud Architecture with AWS',
      description: 'Design and implement scalable cloud solutions using Amazon Web Services.',
      category: 'Cloud Computing',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 743,
      rating: 4.6,
      price: 449,
      instructor: 'David Kim',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      tags: ['AWS', 'Cloud', 'DevOps'],
      lessons: 28,
      isEnrolled: false
    }
  ];

  const categories = ['all', 'AI & Machine Learning', 'Web Development', 'Design', 'Cloud Computing', 'Data Science'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-primary">Course Catalog</h1>
                <p className="text-muted-foreground">Discover and enroll in professional development courses</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/hanu-academy">Back to Academy</Link>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search courses, topics, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-white border border-slate-100 hover:bg-white border border-slate-100-strong transition-all duration-300 group">
                {/* Course Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.isEnrolled && (
                    <Badge className="absolute top-3 right-3 bg-green-500">Enrolled</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Course Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructor */}
                  <div className="text-sm text-muted-foreground">
                    Instructor: <span className="text-foreground">{course.instructor}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-lg font-bold text-primary">
                      ${course.price}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyCatalog;