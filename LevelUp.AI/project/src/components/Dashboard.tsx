import React from 'react';
import { BookOpen, Trophy, Users, TrendingUp, Clock, Star, Target, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { user, courses, analytics } = useApp();

  const currentCourses = courses.filter(course => user.currentCourses.includes(course.id));
  const recentAchievements = user.badges.filter(badge => badge.earned).slice(0, 3);

  const stats = [
    { label: 'Courses Completed', value: user.completedCourses.length, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Current Level', value: user.level, icon: Trophy, color: 'bg-purple-500' },
    { label: 'Learning Streak', value: `${user.streak} days`, icon: Zap, color: 'bg-green-500' },
    { label: 'Total XP', value: user.xp.toLocaleString(), icon: Star, color: 'bg-yellow-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-1">Continue your learning journey and reach new heights</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">Level {user.level}</div>
          <div className="text-sm text-gray-500">
            {user.xpToNextLevel} XP to next level
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Progress Overview</h2>
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Level Progress</span>
              <span className="font-medium">{user.xp % 1000}/1000 XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{user.streak}</div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{user.badges.filter(b => b.earned).length}</div>
              <div className="text-sm text-gray-500">Badges Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{user.completedCourses.length}</div>
              <div className="text-sm text-gray-500">Courses Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
        <div className="space-y-4">
          {currentCourses.map(course => (
            <div key={course.id} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.instructor} • {course.duration}</p>
                    </div>
                    <span className="text-sm font-medium text-purple-600">{course.progress}% complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAchievements.map(badge => (
            <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{badge.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900">{badge.name}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
            <BookOpen className="w-6 h-6 mb-2" />
            <div className="text-sm font-medium">Browse Courses</div>
          </button>
          <button className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
            <Users className="w-6 h-6 mb-2" />
            <div className="text-sm font-medium">View Leaderboard</div>
          </button>
          <button className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
            <TrendingUp className="w-6 h-6 mb-2" />
            <div className="text-sm font-medium">Check Progress</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;