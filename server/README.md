# API Configuration

## Setting up OpenRouter AI for Skill Extraction

To enable AI-powered skill extraction from user profiles, you need to configure your OpenRouter API key:

### Step 1: Get your API Key
1. Go to [OpenRouter.ai](https://openrouter.ai/keys)
2. Sign up or log in to your account
3. Create a new API key

### Step 2: Configure the API Key
1. Open `server/config.js`
2. Replace `'your-api-key-here'` with your actual API key:

```javascript
export const config = {
  OPENROUTER_API_KEY: 'sk-or-v1-your-actual-api-key-here',
  // ... other config
};
```

### Step 3: Test the Integration
Once configured, the AI will automatically extract programming skills from user bios when they update their profiles.

## Other Configuration Options

- **JWT_SECRET**: Used for token signing (automatically uses environment variable if available)
- **OPENROUTER_URL**: The API endpoint (usually doesn't need to be changed)

## Features
- Automatic skill extraction from user profiles
- Secure JWT authentication
- Easy API key management through config file