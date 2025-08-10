import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUserChallengeSchema, insertUserProgressSchema, insertHackathonParticipantSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user", error });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user", error });
    }
  });

  // Challenge routes
  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getAllChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges", error });
    }
  });

  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const challenge = await storage.getChallenge(req.params.id);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenge", error });
    }
  });

  // User Challenge routes
  app.get("/api/users/:userId/challenges", async (req, res) => {
    try {
      const userChallenges = await storage.getUserChallenges(req.params.userId);
      res.json(userChallenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user challenges", error });
    }
  });

  app.post("/api/users/:userId/challenges", async (req, res) => {
    try {
      const userChallengeData = insertUserChallengeSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      
      const userChallenge = await storage.createUserChallenge(userChallengeData);
      res.status(201).json(userChallenge);
    } catch (error) {
      res.status(400).json({ message: "Failed to create user challenge", error });
    }
  });

  app.put("/api/user-challenges/:id", async (req, res) => {
    try {
      const updates = req.body;
      const userChallenge = await storage.updateUserChallenge(req.params.id, updates);
      
      if (!userChallenge) {
        return res.status(404).json({ message: "User challenge not found" });
      }

      res.json(userChallenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user challenge", error });
    }
  });

  // Learning Resource routes
  app.get("/api/learning-resources", async (req, res) => {
    try {
      const resources = await storage.getAllLearningResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to get learning resources", error });
    }
  });

  app.get("/api/learning-resources/:id", async (req, res) => {
    try {
      const resource = await storage.getLearningResource(req.params.id);
      if (!resource) {
        return res.status(404).json({ message: "Learning resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to get learning resource", error });
    }
  });

  // User Progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user progress", error });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      
      const progress = await storage.createUserProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Failed to create user progress", error });
    }
  });

  app.put("/api/user-progress/:id", async (req, res) => {
    try {
      const updates = req.body;
      const progress = await storage.updateUserProgress(req.params.id, updates);
      
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }

      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user progress", error });
    }
  });

  // Hackathon routes
  app.get("/api/hackathons", async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json(hackathons);
    } catch (error) {
      res.status(500).json({ message: "Failed to get hackathons", error });
    }
  });

  app.get("/api/hackathons/:id", async (req, res) => {
    try {
      const hackathon = await storage.getHackathon(req.params.id);
      if (!hackathon) {
        return res.status(404).json({ message: "Hackathon not found" });
      }
      res.json(hackathon);
    } catch (error) {
      res.status(500).json({ message: "Failed to get hackathon", error });
    }
  });

  app.get("/api/hackathons/:id/participants", async (req, res) => {
    try {
      const participants = await storage.getHackathonParticipants(req.params.id);
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to get hackathon participants", error });
    }
  });

  app.post("/api/hackathons/:hackathonId/participants", async (req, res) => {
    try {
      const participantData = insertHackathonParticipantSchema.parse({
        ...req.body,
        hackathonId: req.params.hackathonId
      });
      
      const participant = await storage.createHackathonParticipant(participantData);
      res.status(201).json(participant);
    } catch (error) {
      res.status(400).json({ message: "Failed to join hackathon", error });
    }
  });

  app.get("/api/users/:userId/hackathons", async (req, res) => {
    try {
      const participations = await storage.getUserHackathonParticipations(req.params.userId);
      res.json(participations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user hackathons", error });
    }
  });

  // Leaderboard routes
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      const leaderboardWithoutPasswords = leaderboard.map(({ password, ...user }) => user);
      res.json(leaderboardWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to get leaderboard", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
