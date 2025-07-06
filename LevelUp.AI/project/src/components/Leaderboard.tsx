import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Leaderboard: React.FC = () => {
  const { leaderboard, user } = useApp();
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200';
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (timeFrame) {
      case 'weekly': return b.weeklyXp - a.weeklyXp;
      case 'monthly': return b.xp - a.xp; // Using total XP as proxy for monthly
      case 'all-time': return b.xp - a.xp;
      default: return 0;
    }
  });

  const userRank = sortedLeaderboard.findIndex(entry => entry.id === user.id) + 1;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">See how you stack up against other learners</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as 'weekly' | 'monthly' | 'all-time')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>

      {/* Your Rank */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{userRank}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Current Rank</h2>
              <p className="text-purple-100">Keep learning to climb higher!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{user.xp.toLocaleString()} XP</div>
            <div className="text-sm text-purple-100">Total Experience</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performers</h2>
        <div className="flex justify-center items-end space-x-4 mb-8">
          {sortedLeaderboard.slice(0, 3).map((entry, index) => {
            const rank = index + 1;
            const height = rank === 1 ? 'h-32' : rank === 2 ? 'h-24' : 'h-20';
            return (
              <div key={entry.id} className="flex flex-col items-center">
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-2"
                />
                <div className={`${getRankBadgeColor(rank)} ${height} w-20 rounded-t-lg flex flex-col items-center justify-end p-2 text-white`}>
                  <div className="text-xl font-bold">{rank}</div>
                  <div className="text-xs text-center">{entry.name}</div>
                  <div className="text-xs">{entry.xp.toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Full Rankings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedLeaderboard.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = entry.id === user.id;
            const xpValue = timeFrame === 'weekly' ? entry.weeklyXp : entry.xp;
            
            return (
              <div 
                key={entry.id} 
                className={`p-6 hover:bg-gray-50 transition-colors ${isCurrentUser ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(rank)}
                    </div>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                    <div>
                      <h3 className={`font-bold ${isCurrentUser ? 'text-purple-900' : 'text-gray-900'}`}>
                        {entry.name}
                        {isCurrentUser && <span className="text-purple-600 ml-2">(You)</span>}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {entry.department} • Level {entry.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {xpValue.toLocaleString()} XP
                    </div>
                    <div className="text-sm text-gray-500">
                      {timeFrame === 'weekly' ? 'This week' : 'Total'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Leaderboard */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Department Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Engineering', 'Design', 'Marketing', 'Sales', 'Data Science', 'Security'].map((dept, index) => {
            const deptUsers = sortedLeaderboard.filter(entry => entry.department === dept);
            const totalXP = deptUsers.reduce((sum, user) => sum + user.xp, 0);
            const avgXP = deptUsers.length > 0 ? Math.round(totalXP / deptUsers.length) : 0;
            
            return (
              <div key={dept} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{dept}</h3>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium">{deptUsers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg XP</span>
                    <span className="font-medium">{avgXP.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total XP</span>
                    <span className="font-medium">{totalXP.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;