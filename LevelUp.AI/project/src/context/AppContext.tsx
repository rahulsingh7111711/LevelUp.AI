import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, LeaderboardEntry, AnalyticsData, ChatMessage } from '../types';
import { mockUser, mockCourses, mockLeaderboard, mockAnalytics } from '../data/mockData';

interface AppContextType {
  user: User;
  courses: Course[];
  leaderboard: LeaderboardEntry[];
  analytics: AnalyticsData;
  chatMessages: ChatMessage[];
  currentView: string;
  setCurrentView: (view: string) => void;
  updateUserProgress: (courseId: string, lessonId: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  enrollInCourse: (courseId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [leaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');

  const updateUserProgress = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => {
          if (lesson.id === lessonId && !lesson.completed) {
            setUser(prevUser => ({
              ...prevUser,
              xp: prevUser.xp + lesson.xpReward,
              level: Math.floor((prevUser.xp + lesson.xpReward) / 1000) + 1
            }));
            return { ...lesson, completed: true };
          }
          return lesson;
        });
        
        const completedLessons = updatedLessons.filter(l => l.completed).length;
        const progress = (completedLessons / updatedLessons.length) * 100;
        
        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const enrollInCourse = (courseId: string) => {
    setUser(prev => ({
      ...prev,
      currentCourses: [...prev.currentCourses, courseId]
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      courses,
      leaderboard,
      analytics,
      chatMessages,
      currentView,
      setCurrentView,
      updateUserProgress,
      addChatMessage,
      enrollInCourse
    }}>
      {children}
    </AppContext.Provider>
  );
};