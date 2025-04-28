
import { useState, useEffect } from 'react';
import { PromptTemplate } from '@/components/PromptCard';

const RECENT_SEARCHES_KEY = 'recent-searches';
const MAX_RECENT_SEARCHES = 3;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<PromptTemplate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const addRecentSearch = (prompt: PromptTemplate) => {
    const updated = [
      prompt,
      ...recentSearches.filter(p => p.id !== prompt.id)
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  return {
    recentSearches,
    addRecentSearch
  };
};
