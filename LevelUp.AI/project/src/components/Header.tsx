import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { user } = useApp();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, topics, or people..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-96"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Level {user.level} • {user.xp} XP</p>
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;