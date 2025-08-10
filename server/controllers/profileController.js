const Database = require('@replit/database');
const profileAgent = require('../agents/profileAgent');

const db = new Database();

// Update user profile with AI skill extraction
exports.updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.userId; // From auth middleware

    if (!bio) {
      return res.status(400).json({ message: 'Bio is required' });
    }

    // Use AI agent to extract skills from bio
    const extractedSkills = await profileAgent.extractSkillsFromBio(bio);

    // Get current user data
    const user = await db.get(`user_id:${userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with new skills and bio
    const updatedUser = {
      ...user,
      bio,
      skills: extractedSkills,
      updatedAt: new Date().toISOString()
    };

    // Save updated user to both indexes
    await db.set(`user:${user.email}`, updatedUser);
    await db.set(`user_id:${userId}`, updatedUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({
      user: userWithoutPassword,
      extractedSkills
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      message: 'Profile update failed',
      error: error.message 
    });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await db.get(`user_id:${userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get profile' });
  }
};