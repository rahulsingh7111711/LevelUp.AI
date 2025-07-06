import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Clock, Target, BarChart3, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Analytics: React.FC = () => {
  const { analytics, user, courses } = useApp();

  const personalStats = [
    { label: 'Courses Completed', value: user.completedCourses.length, change: '+12%', icon: BookOpen },
    { label: 'Learning Hours', value: '45.5', change: '+18%', icon: Clock },
    { label: 'Current Streak', value: user.streak, change: '+3 days', icon: Target },
    { label: 'XP Earned', value: user.xp.toLocaleString(), change: '+250', icon: Award }
  ];

  const platformStats = [
    { label: 'Total Learners', value: analytics.totalUsers.toLocaleString(), icon: Users },
    { label: 'Active This Week', value: analytics.activeUsers.toLocaleString(), icon: TrendingUp },
    { label: 'Total Courses', value: courses.length.toString(), icon: BookOpen },
    { label: 'Completion Rate', value: `${analytics.complianceRate}%`, icon: Target }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600 mt-1">Track your progress and platform insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Personal Performance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Progress Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
          <BarChart3 className="w-6 h-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {courses.slice(0, 5).map((course, index) => {
            const progress = user.currentCourses.includes(course.id) ? course.progress : 
                           user.completedCourses.includes(course.id) ? 100 : 0;
            return (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{course.title}</span>
                  <span className="text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Popular Categories</h2>
            <PieChart className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-3">
            {analytics.topCategories.map((category, index) => {
              const percentage = (category.value / analytics.totalUsers) * 100;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{category.value.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-1">Peak Learning Hours</h3>
              <p className="text-sm text-blue-700">Most active between 10 AM - 2 PM</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-900 mb-1">Completion Rate</h3>
              <p className="text-sm text-green-700">85% of started courses are completed</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-1">Skill Development</h3>
              <p className="text-sm text-purple-700">Technical skills most popular</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-1">Engagement</h3>
              <p className="text-sm text-yellow-700">Average session: 45 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time-based Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Activity</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const activity = Math.floor(Math.random() * 100); // Mock data
            return (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{day}</div>
                <div className="w-full bg-gray-200 rounded h-20 flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-blue-600 rounded"
                    style={{ height: `${activity}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{activity}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;