import React from 'react';
import { Trophy, Star, Target, Zap, Award, Medal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Achievements: React.FC = () => {
  const { user } = useApp();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const earnedBadges = user.badges.filter(badge => badge.earned);
  const unearned = user.badges.filter(badge => !badge.earned);

  const stats = [
    { label: 'Total Badges', value: earnedBadges.length, icon: Trophy, color: 'text-yellow-600' },
    { label: 'Rare Badges', value: earnedBadges.filter(b => b.rarity === 'rare').length, icon: Star, color: 'text-blue-600' },
    { label: 'Epic Badges', value: earnedBadges.filter(b => b.rarity === 'epic').length, icon: Award, color: 'text-purple-600' },
    { label: 'Legendary', value: earnedBadges.filter(b => b.rarity === 'legendary').length, icon: Medal, color: 'text-yellow-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-1">Track your progress and celebrate your accomplishments</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{earnedBadges.length}</div>
          <div className="text-sm text-gray-500">Badges Earned</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Achievement Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Achievement Hunter</h3>
            <p className="text-sm text-gray-600">Collect all available badges</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                style={{ width: `${(earnedBadges.length / user.badges.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {earnedBadges.length} of {user.badges.length} badges
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Streak Master</h3>
            <p className="text-sm text-gray-600">Maintain learning consistency</p>
            <div className="text-2xl font-bold text-green-600 mt-2">{user.streak}</div>
            <p className="text-xs text-gray-500">Current streak</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">XP Collector</h3>
            <p className="text-sm text-gray-600">Accumulate experience points</p>
            <div className="text-2xl font-bold text-yellow-600 mt-2">{user.xp.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Total XP earned</p>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Earned Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-xl border-2 ${getRarityColor(badge.rarity)}`}>
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-900">{badge.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${getRarityBadgeColor(badge.rarity)}`}></span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 capitalize">{badge.rarity}</span>
                    {badge.earnedAt && (
                      <span className="text-xs text-gray-400">
                        {badge.earnedAt.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unearned Badges */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unearned.map(badge => (
            <div key={badge.id} className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-75">
              <div className="flex items-start space-x-3">
                <div className="text-3xl grayscale">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-700">{badge.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${getRarityBadgeColor(badge.rarity)} opacity-50`}></span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400 capitalize">{badge.rarity}</span>
                    <span className="text-xs text-gray-400">Not earned</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;