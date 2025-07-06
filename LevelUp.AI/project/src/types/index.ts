export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  badges: Badge[];
  completedCourses: string[];
  currentCourses: string[];
  department?: string;
  role?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image: string;
  progress: number;
  rating: number;
  students: number;
  lessons: Lesson[];
  skills: string[];
  xpReward: number;
  isCorporate?: boolean;
  complianceRequired?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'reading' | 'interactive';
  xpReward: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  department?: string;
  weeklyXp: number;
}

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  coursesCompleted: number;
  averageProgress: number;
  topCategories: Array<{ name: string; value: number }>;
  learningHours: number;
  certificatesIssued: number;
  complianceRate: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'course-recommendation';
}