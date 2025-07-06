import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';
import Analytics from './components/Analytics';
import Corporate from './components/Corporate';
import AITutor from './components/AITutor';
import Profile from './components/Profile';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <Courses />;
      case 'achievements': return <Achievements />;
      case 'leaderboard': return <Leaderboard />;
      case 'analytics': return <Analytics />;
      case 'corporate': return <Corporate />;
      case 'ai-tutor': return <AITutor />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;