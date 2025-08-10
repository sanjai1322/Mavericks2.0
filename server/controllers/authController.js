const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('@replit/database');

const db = new Database();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { 
    expiresIn: '7d' 
  });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await db.get(`user:${email}`);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object
    const userId = Date.now().toString(); // Simple ID generation
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

    // Save user to database
    await db.set(`user:${email}`, user);
    await db.set(`user_id:${userId}`, user);

    // Generate token
    const token = generateToken(userId);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.get(`user:${email}`);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};