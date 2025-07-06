import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, Play, BookOpen, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Courses: React.FC = () => {
  const { courses, user, enrollInCourse } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = ['all', 'Frontend Development', 'AI & Machine Learning', 'Leadership', 'Security', 'Design'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId);
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-600 mt-1">Discover new skills and advance your career</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {filteredCourses.length} of {courses.length} courses
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Course</h2>
            <p className="text-purple-100 mb-4">Recommended for you based on your learning history</p>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">AI & Machine Learning</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">6h 15m</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">⭐ 4.9</span>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Start Learning
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              {course.isCorporate && (
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                    Corporate
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{course.xpReward} XP</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">by {course.instructor}</span>
                {user.currentCourses.includes(course.id) ? (
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Continue</span>
                  </button>
                ) : user.completedCourses.includes(course.id) ? (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                    Completed
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;