export interface User {
  id: string;
  username: string;
  name: string;
  level: number;
  xp: number;
  skills: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Locked';
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'Recommended' | 'In Progress' | 'Advanced' | 'Popular' | 'New' | 'Trending';
  progress?: number;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  timeLeft?: string;
  startsIn?: string;
  duration?: string;
  prizePool: string;
  participants?: number;
  joined?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  name: string;
  level: number;
  score: number;
  challengesSolved: number;
  badges: string[];
  isCurrentUser?: boolean;
}
