import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Database from "@replit/database";
import fetch from "node-fetch";
// @ts-ignore
import { config } from './config.js';

const app = express();

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Database instance
const db = new Database();

// JWT middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, config.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Profile Agent
class ProfileAgent {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = config.OPENROUTER_API_KEY;
    this.apiUrl = config.OPENROUTER_URL;
  }

  async extractSkillsFromBio(bio: string) {
    try {
      if (!this.apiKey || this.apiKey === 'your-api-key-here') {
        console.warn('OpenRouter API key not configured. Please update server/config.js with your API key.');
        return []; // Return empty skills array instead of throwing error
      }

      const prompt = `
You are a professional skill extraction AI. Analyze the following user bio and extract relevant programming and technical skills. Return ONLY a JSON array of skill objects with this exact format:

[
  {"name": "JavaScript", "level": "Intermediate", "category": "Programming Language"},
  {"name": "React", "level": "Advanced", "category": "Frontend Framework"},
  {"name": "Node.js", "level": "Beginner", "category": "Backend Technology"}
]

Categories should be one of: "Programming Language", "Frontend Framework", "Backend Technology", "Database", "DevOps", "Mobile Development", "Data Science", "AI/ML", "Cloud Platform", "Tool/Software"

Levels should be: "Beginner", "Intermediate", "Advanced", "Expert"

Bio to analyze:
"${bio}"

Return only the JSON array, no other text.
`;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as any;
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from OpenRouter API');
      }

      try {
        const skills = JSON.parse(content.trim());
        
        if (!Array.isArray(skills)) {
          throw new Error('Response is not an array');
        }

        const validatedSkills = skills.filter(skill => 
          skill.name && skill.level && skill.category
        );

        return validatedSkills;
      } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        return [];
      }

    } catch (error) {
      console.error('Skill extraction error:', error);
      return [];
    }
  }
}

const profileAgent = new ProfileAgent();

// Generate JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, config.JWT_SECRET, { 
    expiresIn: '7d' 
  });
};

// New Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    const existingUserResult = await db.get(`user:${email}`);
    const existingUser = existingUserResult?.value || existingUserResult;

    
    // Check if user already exists
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = Date.now().toString();
    const user = {
      id: userId,
      username,
      email,
      name,
      password: hashedPassword,
      level: 1,
      xp: 0,
      skills: [],
      createdAt: new Date().toISOString()
    };

    await db.set(`user:${email}`, user);
    await db.set(`user_id:${userId}`, user);

    const token = generateToken(userId);
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await db.get(`user:${email}`) as any;
    const user = userResult?.value || userResult;
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Handle both hashed and plain text passwords for backward compatibility
    let isPasswordValid = false;
    
    try {
      // Try bcrypt comparison first (for new hashed passwords)
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (error) {
      // If bcrypt fails, try plain text comparison (for old users)
      isPasswordValid = password === user.password;
    }
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// New Profile Routes
app.post("/api/profile/update", authenticateToken, async (req: any, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.userId;

    if (!bio) {
      return res.status(400).json({ message: 'Bio is required' });
    }

    const extractedSkills = await profileAgent.extractSkillsFromBio(bio);

    const userResult = await db.get(`user_id:${userId}`) as any;
    const user = userResult?.value || userResult;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = {
      ...user,
      bio,
      skills: extractedSkills,
      updatedAt: new Date().toISOString()
    };

    await db.set(`user:${user.email}`, updatedUser);
    await db.set(`user_id:${userId}`, updatedUser);

    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({
      user: userWithoutPassword,
      extractedSkills
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      message: 'Profile update failed',
      error: (error as Error).message 
    });
  }
});

app.get("/api/profile", authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;

    const userResult = await db.get(`user_id:${userId}`) as any;
    const user = userResult?.value || userResult;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

// Clear database endpoint (for development only)
app.delete('/api/admin/clear-users', async (req, res) => {
  try {
    // Force clear specific known user emails
    const emails = ['fresh@example.com', 'sanjai131418@gmail.com', 'test@example.com', 'sanjaifresh@gmail.com', 'newtest@example.com', 'test2024@example.com'];
    const deletedKeys = [];
    
    for (const email of emails) {
      try {
        await db.delete(`user:${email}`);
        deletedKeys.push(`user:${email}`);
        console.log(`Force deleted user:${email}`);
      } catch (e) { /* ignore */ }
      
      try {
        await db.delete(email);
        deletedKeys.push(email);
        console.log(`Force deleted ${email}`);
      } catch (e) { /* ignore */ }
    }
    
    // Try to delete user_id keys
    for (let i = 1; i < 100; i++) {
      try {
        const key = `user_id:${i}`;
        await db.delete(key);
        deletedKeys.push(key);
        console.log(`Deleted ${key}`);
      } catch (e) { /* ignore */ }
    }
    
    console.log('Force database clear completed');
    
    res.json({ 
      message: 'Database force cleared successfully', 
      deletedKeys: deletedKeys.length,
      keys: deletedKeys
    });
    
  } catch (error) {
    console.error('Error clearing database:', error);
    res.status(500).json({ message: 'Failed to clear database', error: (error as Error).message });
  }
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
