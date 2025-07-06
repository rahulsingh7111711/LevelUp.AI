import React from 'react';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Building2, 
  MessageSquare, 
  User,
  GraduationCap,
  Target,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'corporate', label: 'Corporate Training', icon: Building2 },
    { id: 'ai-tutor', label: 'AI Tutor', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">LevelUp.AI</h1>
            <p className="text-sm text-gray-500">Learn. Grow. Excel.</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Daily Goal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">3 of 4 lessons completed</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;