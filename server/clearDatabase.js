import Database from '@replit/database';

const db = new Database();

async function clearAllUsers() {
  try {
    console.log('Starting database cleanup...');
    
    // List all keys to see what we have
    const keys = await db.list();
    console.log('Found keys:', keys);
    
    // Delete all user-related keys
    const userKeys = keys.filter(key => 
      key.startsWith('user:') || 
      key.startsWith('user_id:') ||
      key.includes('@') ||
      key.includes('sanjai') ||
      key.includes('test')
    );
    
    console.log('Deleting user keys:', userKeys);
    
    for (const key of userKeys) {
      await db.delete(key);
      console.log(`Deleted: ${key}`);
    }
    
    console.log('Database cleanup completed!');
    console.log('You can now register fresh users.');
    
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

clearAllUsers();