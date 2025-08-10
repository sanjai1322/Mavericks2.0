import { 
  type User, 
  type InsertUser,
  type Challenge,
  type InsertChallenge,
  type UserChallenge,
  type InsertUserChallenge,
  type LearningResource,
  type InsertLearningResource,
  type UserProgress,
  type InsertUserProgress,
  type Hackathon,
  type InsertHackathon,
  type HackathonParticipant,
  type InsertHackathonParticipant
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Challenge operations
  getAllChallenges(): Promise<Challenge[]>;
  getChallenge(id: string): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;

  // User Challenge operations
  getUserChallenges(userId: string): Promise<UserChallenge[]>;
  getUserChallenge(userId: string, challengeId: string): Promise<UserChallenge | undefined>;
  createUserChallenge(userChallenge: InsertUserChallenge): Promise<UserChallenge>;
  updateUserChallenge(id: string, updates: Partial<UserChallenge>): Promise<UserChallenge | undefined>;

  // Learning Resource operations
  getAllLearningResources(): Promise<LearningResource[]>;
  getLearningResource(id: string): Promise<LearningResource | undefined>;
  createLearningResource(resource: InsertLearningResource): Promise<LearningResource>;

  // User Progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserProgressForResource(userId: string, resourceId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;

  // Hackathon operations
  getAllHackathons(): Promise<Hackathon[]>;
  getHackathon(id: string): Promise<Hackathon | undefined>;
  createHackathon(hackathon: InsertHackathon): Promise<Hackathon>;

  // Hackathon Participant operations
  getHackathonParticipants(hackathonId: string): Promise<HackathonParticipant[]>;
  getUserHackathonParticipations(userId: string): Promise<HackathonParticipant[]>;
  createHackathonParticipant(participant: InsertHackathonParticipant): Promise<HackathonParticipant>;
  updateHackathonParticipant(id: string, updates: Partial<HackathonParticipant>): Promise<HackathonParticipant | undefined>;

  // Leaderboard operations
  getLeaderboard(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private challenges: Map<string, Challenge> = new Map();
  private userChallenges: Map<string, UserChallenge> = new Map();
  private learningResources: Map<string, LearningResource> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private hackathons: Map<string, Hackathon> = new Map();
  private hackathonParticipants: Map<string, HackathonParticipant> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed sample challenges
    const sampleChallenges: InsertChallenge[] = [
      {
        title: "Two Sum",
        description: "Find two numbers that add up to target",
        difficulty: "Easy",
        category: "Arrays",
        problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: ['Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]'],
        testCases: ['[2,7,11,15], 9 -> [0,1]'],
        starterCode: 'function twoSum(nums, target) {\n    // Your code here\n}'
      },
      {
        title: "Valid Parentheses",
        description: "Check if parentheses are properly closed",
        difficulty: "Easy",
        category: "Stack",
        problemStatement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: ['Input: s = "()" Output: true', 'Input: s = "()[]{}" Output: true'],
        testCases: ['"()" -> true', '"()[]{}" -> true', '"(]" -> false'],
        starterCode: 'function isValid(s) {\n    // Your code here\n}'
      }
    ];

    sampleChallenges.forEach(challenge => {
      this.createChallenge(challenge);
    });

    // Seed sample learning resources
    const sampleResources: InsertLearningResource[] = [
      {
        title: "JavaScript Fundamentals",
        description: "Master the core concepts of JavaScript including variables, functions, and object-oriented programming.",
        duration: "4 hours",
        category: "Programming Languages",
        content: "Comprehensive JavaScript course content...",
        difficulty: "Beginner"
      },
      {
        title: "Data Structures & Algorithms",
        description: "Deep dive into essential data structures and algorithmic thinking for competitive programming.",
        duration: "8 hours",
        category: "Computer Science",
        content: "DSA course content...",
        difficulty: "Intermediate"
      }
    ];

    sampleResources.forEach(resource => {
      this.createLearningResource(resource);
    });

    // Seed sample hackathons
    const sampleHackathons: InsertHackathon[] = [
      {
        title: "AI Innovation Challenge",
        description: "Build innovative AI-powered applications that solve real-world problems.",
        status: "Live",
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Started yesterday
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Ends in 2 days
        prizePool: "$10,000",
        maxParticipants: 500
      },
      {
        title: "Mobile App Challenge",
        description: "Design and develop innovative mobile applications for iOS and Android platforms.",
        status: "Upcoming",
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Starts in 3 days
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Ends in 10 days
        prizePool: "$8,000",
        maxParticipants: 300
      }
    ];

    sampleHackathons.forEach(hackathon => {
      this.createHackathon(hackathon);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      level: 1,
      xp: 0,
      skills: [],
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Challenge operations
  async getAllChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async getChallenge(id: string): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = randomUUID();
    const challenge: Challenge = { 
      ...insertChallenge, 
      id,
      examples: insertChallenge.examples || null,
      testCases: insertChallenge.testCases || null,
      starterCode: insertChallenge.starterCode || null,
      createdAt: new Date()
    };
    this.challenges.set(id, challenge);
    return challenge;
  }

  // User Challenge operations
  async getUserChallenges(userId: string): Promise<UserChallenge[]> {
    return Array.from(this.userChallenges.values()).filter(uc => uc.userId === userId);
  }

  async getUserChallenge(userId: string, challengeId: string): Promise<UserChallenge | undefined> {
    return Array.from(this.userChallenges.values()).find(
      uc => uc.userId === userId && uc.challengeId === challengeId
    );
  }

  async createUserChallenge(insertUserChallenge: InsertUserChallenge): Promise<UserChallenge> {
    const id = randomUUID();
    const userChallenge: UserChallenge = { 
      ...insertUserChallenge, 
      id,
      solution: insertUserChallenge.solution || null,
      completedAt: insertUserChallenge.completedAt || null,
      createdAt: new Date()
    };
    this.userChallenges.set(id, userChallenge);
    return userChallenge;
  }

  async updateUserChallenge(id: string, updates: Partial<UserChallenge>): Promise<UserChallenge | undefined> {
    const userChallenge = this.userChallenges.get(id);
    if (!userChallenge) return undefined;
    
    const updatedUserChallenge = { ...userChallenge, ...updates };
    this.userChallenges.set(id, updatedUserChallenge);
    return updatedUserChallenge;
  }

  // Learning Resource operations
  async getAllLearningResources(): Promise<LearningResource[]> {
    return Array.from(this.learningResources.values());
  }

  async getLearningResource(id: string): Promise<LearningResource | undefined> {
    return this.learningResources.get(id);
  }

  async createLearningResource(insertResource: InsertLearningResource): Promise<LearningResource> {
    const id = randomUUID();
    const resource: LearningResource = { 
      ...insertResource, 
      id,
      content: insertResource.content || null,
      createdAt: new Date()
    };
    this.learningResources.set(id, resource);
    return resource;
  }

  // User Progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(up => up.userId === userId);
  }

  async getUserProgressForResource(userId: string, resourceId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      up => up.userId === userId && up.resourceId === resourceId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      progress: insertProgress.progress || null,
      startedAt: insertProgress.startedAt || null,
      completedAt: insertProgress.completedAt || null,
      createdAt: new Date()
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = this.userProgress.get(id);
    if (!progress) return undefined;
    
    const updatedProgress = { ...progress, ...updates };
    this.userProgress.set(id, updatedProgress);
    return updatedProgress;
  }

  // Hackathon operations
  async getAllHackathons(): Promise<Hackathon[]> {
    return Array.from(this.hackathons.values());
  }

  async getHackathon(id: string): Promise<Hackathon | undefined> {
    return this.hackathons.get(id);
  }

  async createHackathon(insertHackathon: InsertHackathon): Promise<Hackathon> {
    const id = randomUUID();
    const hackathon: Hackathon = { 
      ...insertHackathon, 
      id,
      maxParticipants: insertHackathon.maxParticipants || null,
      createdAt: new Date()
    };
    this.hackathons.set(id, hackathon);
    return hackathon;
  }

  // Hackathon Participant operations
  async getHackathonParticipants(hackathonId: string): Promise<HackathonParticipant[]> {
    return Array.from(this.hackathonParticipants.values()).filter(hp => hp.hackathonId === hackathonId);
  }

  async getUserHackathonParticipations(userId: string): Promise<HackathonParticipant[]> {
    return Array.from(this.hackathonParticipants.values()).filter(hp => hp.userId === userId);
  }

  async createHackathonParticipant(insertParticipant: InsertHackathonParticipant): Promise<HackathonParticipant> {
    const id = randomUUID();
    const participant: HackathonParticipant = { 
      ...insertParticipant, 
      id,
      projectName: insertParticipant.projectName || null,
      projectDescription: insertParticipant.projectDescription || null,
      repositoryUrl: insertParticipant.repositoryUrl || null,
      rank: insertParticipant.rank || null,
      score: insertParticipant.score || null,
      submittedAt: insertParticipant.submittedAt || null,
      joinedAt: new Date()
    };
    this.hackathonParticipants.set(id, participant);
    return participant;
  }

  async updateHackathonParticipant(id: string, updates: Partial<HackathonParticipant>): Promise<HackathonParticipant | undefined> {
    const participant = this.hackathonParticipants.get(id);
    if (!participant) return undefined;
    
    const updatedParticipant = { ...participant, ...updates };
    this.hackathonParticipants.set(id, updatedParticipant);
    return updatedParticipant;
  }

  // Leaderboard operations
  async getLeaderboard(): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => (b.xp || 0) - (a.xp || 0))
      .slice(0, 50); // Top 50 users
  }
}

export const storage = new MemStorage();
