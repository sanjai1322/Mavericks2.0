const fetch = require('node-fetch');

class ProfileAgent {
  constructor() {
    this.apiKey = process.env.OPENROUTER_KEY;
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  }

  async extractSkillsFromBio(bio) {
    try {
      if (!this.apiKey) {
        throw new Error('OPENROUTER_KEY environment variable is required');
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

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from OpenRouter API');
      }

      // Parse the JSON response
      try {
        const skills = JSON.parse(content.trim());
        
        // Validate the structure
        if (!Array.isArray(skills)) {
          throw new Error('Response is not an array');
        }

        // Validate each skill object
        const validatedSkills = skills.filter(skill => 
          skill.name && skill.level && skill.category
        );

        return validatedSkills;
      } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        // Return empty array if parsing fails
        return [];
      }

    } catch (error) {
      console.error('Skill extraction error:', error);
      
      // Return empty array instead of throwing to prevent API failure
      return [];
    }
  }
}

module.exports = new ProfileAgent();