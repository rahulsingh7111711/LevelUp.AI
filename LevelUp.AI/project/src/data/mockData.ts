import { User, Course, LeaderboardEntry, AnalyticsData, Badge } from '../types';

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    earned: true,
    earnedAt: new Date('2024-01-15'),
    rarity: 'common'
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    earned: true,
    earnedAt: new Date('2024-01-22'),
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Knowledge Seeker',
    description: 'Complete 5 courses',
    icon: '📚',
    earned: false,
    rarity: 'epic'
  },
  {
    id: '4',
    name: 'AI Whisperer',
    description: 'Chat with AI tutor 50 times',
    icon: '🤖',
    earned: false,
    rarity: 'legendary'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@company.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  level: 12,
  xp: 11850,
  xpToNextLevel: 150,
  streak: 15,
  badges: mockBadges,
  completedCourses: ['1', '3'],
  currentCourses: ['2', '4'],
  department: 'Engineering',
  role: 'Senior Developer'
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns and hooks for building scalable applications',
    instructor: 'Sarah Chen',
    duration: '4h 30m',
    level: 'advanced',
    category: 'Frontend Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    progress: 100,
    rating: 4.8,
    students: 2847,
    xpReward: 500,
    lessons: [
      { id: '1-1', title: 'Higher-Order Components', duration: '25m', completed: true, type: 'video', xpReward: 100 },
      { id: '1-2', title: 'Render Props Pattern', duration: '30m', completed: true, type: 'video', xpReward: 100 },
      { id: '1-3', title: 'Custom Hooks Deep Dive', duration: '45m', completed: true, type: 'video', xpReward: 150 },
      { id: '1-4', title: 'Context API Best Practices', duration: '35m', completed: true, type: 'video', xpReward: 150 }
    ],
    skills: ['React', 'JavaScript', 'Component Architecture']
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Learn the core concepts of machine learning and AI',
    instructor: 'Dr. Michael Rodriguez',
    duration: '6h 15m',
    level: 'intermediate',
    category: 'AI & Machine Learning',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    progress: 45,
    rating: 4.9,
    students: 1923,
    xpReward: 750,
    lessons: [
      { id: '2-1', title: 'Introduction to ML', duration: '40m', completed: true, type: 'video', xpReward: 100 },
      { id: '2-2', title: 'Supervised Learning', duration: '50m', completed: true, type: 'video', xpReward: 150 },
      { id: '2-3', title: 'Unsupervised Learning', duration: '45m', completed: false, type: 'video', xpReward: 150 },
      { id: '2-4', title: 'Neural Networks Basics', duration: '60m', completed: false, type: 'video', xpReward: 200 },
      { id: '2-5', title: 'Model Evaluation', duration: '35m', completed: false, type: 'quiz', xpReward: 150 }
    ],
    skills: ['Python', 'Machine Learning', 'Data Science']
  },
  {
    id: '3',
    title: 'Leadership & Management',
    description: 'Essential skills for effective team leadership and project management',
    instructor: 'Jennifer Park',
    duration: '3h 45m',
    level: 'intermediate',
    category: 'Leadership',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    progress: 100,
    rating: 4.7,
    students: 3421,
    xpReward: 400,
    isCorporate: true,
    lessons: [
      { id: '3-1', title: 'Communication Skills', duration: '45m', completed: true, type: 'video', xpReward: 100 },
      { id: '3-2', title: 'Team Building', duration: '50m', completed: true, type: 'interactive', xpReward: 150 },
      { id: '3-3', title: 'Conflict Resolution', duration: '40m', completed: true, type: 'video', xpReward: 150 }
    ],
    skills: ['Leadership', 'Communication', 'Team Management']
  },
  {
    id: '4',
    title: 'Cybersecurity Compliance',
    description: 'Essential cybersecurity practices and compliance requirements',
    instructor: 'Robert Kim',
    duration: '2h 20m',
    level: 'beginner',
    category: 'Security',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    progress: 30,
    rating: 4.6,
    students: 5672,
    xpReward: 300,
    isCorporate: true,
    complianceRequired: true,
    lessons: [
      { id: '4-1', title: 'Password Security', duration: '25m', completed: true, type: 'video', xpReward: 75 },
      { id: '4-2', title: 'Phishing Prevention', duration: '30m', completed: false, type: 'quiz', xpReward: 100 },
      { id: '4-3', title: 'Data Protection', duration: '35m', completed: false, type: 'reading', xpReward: 125 }
    ],
    skills: ['Cybersecurity', 'Compliance', 'Risk Management']
  },
  {
    id: '5',
    title: 'UX/UI Design Principles',
    description: 'Master the fundamentals of user experience and interface design',
    instructor: 'Emma Thompson',
    duration: '5h 10m',
    level: 'beginner',
    category: 'Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    progress: 0,
    rating: 4.8,
    students: 2156,
    xpReward: 600,
    lessons: [
      { id: '5-1', title: 'Design Thinking', duration: '40m', completed: false, type: 'video', xpReward: 100 },
      { id: '5-2', title: 'User Research', duration: '35m', completed: false, type: 'video', xpReward: 100 },
      { id: '5-3', title: 'Wireframing', duration: '45m', completed: false, type: 'interactive', xpReward: 150 },
      { id: '5-4', title: 'Visual Design', duration: '50m', completed: false, type: 'video', xpReward: 150 },
      { id: '5-5', title: 'Usability Testing', duration: '40m', completed: false, type: 'quiz', xpReward: 100 }
    ],
    skills: ['UI Design', 'UX Research', 'Prototyping']
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    level: 12,
    xp: 11850,
    department: 'Engineering',
    weeklyXp: 1250
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    level: 15,
    xp: 14250,
    department: 'Design',
    weeklyXp: 1100
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    level: 13,
    xp: 12900,
    department: 'Data Science',
    weeklyXp: 950
  },
  {
    id: '4',
    name: 'Jennifer Park',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    level: 11,
    xp: 10750,
    department: 'Marketing',
    weeklyXp: 800
  },
  {
    id: '5',
    name: 'Robert Kim',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    level: 14,
    xp: 13600,
    department: 'Security',
    weeklyXp: 750
  }
];

export const mockAnalytics: AnalyticsData = {
  totalUsers: 12847,
  activeUsers: 8965,
  coursesCompleted: 3421,
  averageProgress: 67.5,
  topCategories: [
    { name: 'Frontend Development', value: 2847 },
    { name: 'AI & Machine Learning', value: 1923 },
    { name: 'Leadership', value: 3421 },
    { name: 'Security', value: 5672 },
    { name: 'Design', value: 2156 }
  ],
  learningHours: 45620,
  certificatesIssued: 1847,
  complianceRate: 89.3
};