import React, { useState } from 'react';
import { Edit, Save, X, Trophy, Star, Target, Calendar, Mail, Building, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile: React.FC = () => {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    department: user.department || '',
    role: user.role || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      department: user.department || '',
      role: user.role || ''
    });
    setIsEditing(false);
  };

  const earnedBadges = user.badges.filter(badge => badge.earned);
  const skillsProgress = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 78 },
    { name: 'Machine Learning', level: 45 },
    { name: 'Leadership', level: 67 },
    { name: 'Python', level: 52 }
  ];

  const learningHistory = [
    { date: '2024-01-15', activity: 'Completed React Patterns course', type: 'completion' },
    { date: '2024-01-12', activity: 'Earned "Streak Master" badge', type: 'achievement' },
    { date: '2024-01-10', activity: 'Started Machine Learning Fundamentals', type: 'enrollment' },
    { date: '2024-01-08', activity: 'Completed Leadership & Management', type: 'completion' },
    { date: '2024-01-05', activity: 'Earned "First Steps" badge', type: 'achievement' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completion': return '🎓';
      case 'achievement': return '🏆';
      case 'enrollment': return '📚';
      default: return '📖';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and track your progress</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.level}
            </div>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={editData.department}
                      onChange={(e) => setEditData({...editData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) => setEditData({...editData, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{user.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.role}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.level}</div>
                    <div className="text-sm text-gray-500">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.xp.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{user.streak}</div>
                    <div className="text-sm text-gray-500">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{earnedBadges.length}</div>
                    <div className="text-sm text-gray-500">Badges</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.completedCourses.length}</div>
            <div className="text-sm text-gray-500">Courses Completed</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.currentCourses.length}</div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-10 h-10 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{earnedBadges.length}</div>
            <div className="text-sm text-gray-500">Achievements</div>
          </div>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Progress</h3>
        <div className="space-y-4">
          {skillsProgress.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span className="text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {earnedBadges.slice(0, 3).map(badge => (
            <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{badge.icon}</div>
              <div>
                <h4 className="font-medium text-gray-900">{badge.name}</h4>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Learning History</h3>
        <div className="space-y-4">
          {learningHistory.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{getActivityIcon(item.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;