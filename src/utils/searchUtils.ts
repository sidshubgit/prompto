import promptTemplates, { POPULAR_SEARCHES } from '@/data/promptTemplates';
import { PromptTemplate } from '@/components/PromptCard';

// Function to calculate relevance score for a prompt
const calculateRelevanceScore = (prompt: PromptTemplate, searchTerms: string[]): number => {
  let score = 0;
  const query = searchTerms.join(' ').toLowerCase();
  
  // Title match (highest weight)
  if (prompt.title.toLowerCase().includes(query)) {
    score += 5;
  } else {
    searchTerms.forEach(term => {
      if (prompt.title.toLowerCase().includes(term)) {
        score += 3;
      }
    });
  }
  
  // Keyword match
  prompt.keywords.forEach(keyword => {
    searchTerms.forEach(term => {
      if (keyword.toLowerCase().includes(term)) {
        score += 2;
      }
    });
  });
  
  // Tag match
  prompt.useCaseTags.forEach(tag => {
    searchTerms.forEach(term => {
      if (tag.toLowerCase().includes(term)) {
        score += 1.5;
      }
    });
  });
  
  // Template content match
  if (prompt.template.toLowerCase().includes(query)) {
    score += 1;
  }
  
  return score;
};

// Function to generate a dynamic prompt template
const generateDynamicPrompt = (query: string): PromptTemplate => {
  const searchTerms = query.toLowerCase().trim().split(' ');
  const mainTerm = searchTerms[0];
  
  return {
    id: `dynamic-${Date.now()}`,
    title: `Custom ${mainTerm.charAt(0).toUpperCase() + mainTerm.slice(1)} Template`,
    template: `I need help with ${query}. Please provide:

1. A structured approach to ${query}
2. Key considerations and best practices
3. Step-by-step guidance
4. Common pitfalls to avoid
5. Tips for success

Additional context:
- My specific needs: [describe your requirements]
- Target audience: [who is this for]
- Desired outcome: [what you want to achieve]
- Any constraints: [time, resources, etc.]`,
    useCaseTags: ['Custom', 'Dynamic', mainTerm.charAt(0).toUpperCase() + mainTerm.slice(1)],
    difficulty: 'Beginner',
    upvotes: 0,
    keywords: searchTerms,
    description: `A customized template for ${query}`
  };
};

// Function to search prompt templates based on query
export const searchPrompts = (query: string): PromptTemplate[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(' ');
  console.log(`Searching with terms: ${searchTerms.join(', ')}`);
  
  // Search in existing templates
  const existingResults = promptTemplates
    .map(prompt => ({
      prompt,
      score: calculateRelevanceScore(prompt, searchTerms)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.prompt);
  
  // If no results found, generate a dynamic template
  if (existingResults.length === 0) {
    const dynamicTemplate = generateDynamicPrompt(query);
    return [dynamicTemplate];
  }
  
  console.log(`Search completed. Found ${existingResults.length} results.`);
  return existingResults;
};

// Function to get related search suggestions for autocomplete
export const getSearchSuggestions = (query: string): string[] => {
  if (!query.trim()) return POPULAR_SEARCHES.slice(0, 5);
  
  const searchTerm = query.toLowerCase().trim();
  
  // Find matching popular searches
  const popularMatches = POPULAR_SEARCHES.filter(term => 
    term.toLowerCase().includes(searchTerm)
  );
  
  // Find matching keywords from all prompts
  let keywordMatches: string[] = [];
  promptTemplates.forEach(prompt => {
    const matches = prompt.keywords.filter(keyword => 
      keyword.toLowerCase().includes(searchTerm) && 
      !popularMatches.includes(keyword)
    );
    keywordMatches = [...keywordMatches, ...matches];
  });
  
  // Add the current query if it's not in the matches
  if (!popularMatches.includes(query) && !keywordMatches.includes(query)) {
    keywordMatches.unshift(query);
  }
  
  // Combine and return unique results
  const combined = [...popularMatches, ...keywordMatches];
  const unique = Array.from(new Set(combined));
  
  return unique.slice(0, 5);
};
