
import React from 'react';
import SearchBar from '@/components/SearchBar';
import { POPULAR_SEARCHES } from '@/data/promptTemplates';
import { Badge } from '@/components/ui/badge';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import PromptCard from '@/components/PromptCard';

const Index = () => {
  const { recentSearches } = useRecentSearches();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent brand-gradient mb-2">
          Prompto
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform simple keywords into powerful AI prompt templates
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="w-full max-w-3xl">
          <SearchBar 
            suggestions={POPULAR_SEARCHES}
            placeholderText="Search for prompt templates (e.g. 'business plan', 'meal planner')"
            autoFocus={true}
          />
          
          {recentSearches.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-1 gap-4">
                {recentSearches.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.slice(0, 8).map((term, index) => (
                <a 
                  key={index} 
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="no-underline"
                >
                  <Badge 
                    variant="outline" 
                    className="bg-secondary hover:bg-accent transition-colors pulse-on-hover cursor-pointer"
                  >
                    {term}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>Find the perfect prompt template for any AI task</p>
      </footer>
    </div>
  );
};

export default Index;
