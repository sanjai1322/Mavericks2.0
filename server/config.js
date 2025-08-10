// API Configuration
// You can easily update your OpenRouter API key here

// @ts-ignore
export const config = {
  // Replace with your OpenRouter API key
  // Get your key from: https://openrouter.ai/keys
  OPENROUTER_API_KEY:
    "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",

  // You can also add other API configurations here
  JWT_SECRET:
    (typeof process !== "undefined" && process.env?.JWT_SECRET) ||
    "your-secret-key",

  // API URLs
  OPENROUTER_URL: "https://openrouter.ai/api/v1/chat/completions",
};
