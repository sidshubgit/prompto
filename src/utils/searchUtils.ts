
import promptTemplates, { POPULAR_SEARCHES } from '@/data/promptTemplates';
import { PromptTemplate } from '@/components/PromptCard';

// Function to search prompt templates based on query
export const searchPrompts = (query: string): PromptTemplate[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(' ');
  
  // More thorough search with logging
  console.log(`Searching with terms: ${searchTerms.join(', ')}`);
  
  const results = promptTemplates.filter(prompt => {
    // Search in title
    const titleMatch = prompt.title.toLowerCase().includes(query.toLowerCase());
    
    // Search in keywords
    const keywordMatch = prompt.keywords.some(keyword => 
      searchTerms.some(term => keyword.toLowerCase().includes(term))
    );
    
    // Search in tags
    const tagMatch = prompt.useCaseTags.some(tag => 
      searchTerms.some(term => tag.toLowerCase().includes(term))
    );
    
    // Search in template content
    const templateMatch = prompt.template.toLowerCase().includes(query.toLowerCase());
    
    return titleMatch || keywordMatch || tagMatch || templateMatch;
  });
  
  console.log(`Search completed. Found ${results.length} results.`);
  return results;
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
  
  // Combine and return unique results
  const combined = [...popularMatches, ...keywordMatches];
  const unique = Array.from(new Set(combined));
  
  return unique.slice(0, 5);
};
