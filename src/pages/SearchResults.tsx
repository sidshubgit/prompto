import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import PromptCard, { PromptTemplate } from '@/components/PromptCard';
import { searchPrompts, getSearchSuggestions } from '@/utils/searchUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRecentSearches } from '@/hooks/useRecentSearches';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { addRecentSearch } = useRecentSearches();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const searchResults = searchPrompts(query);
      setResults(searchResults);
      // Add first result to recent searches if available
      if (searchResults.length > 0) {
        addRecentSearch(searchResults[0]);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query, addRecentSearch]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-4 border-b">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent brand-gradient">
              Prompto
            </h1>
          </Link>
          
          <div className="flex-1">
            <SearchBar 
              initialQuery={query} 
              onSearch={(newQuery) => {
                if (newQuery !== query) {
                  window.location.href = `/search?q=${encodeURIComponent(newQuery)}`;
                }
              }}
              placeholderText="Refine your search..."
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {loading ? 'Searching...' : `Results for "${query}"`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {loading ? 'Finding the best prompts...' : 
               `${results.length} prompt template${results.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {results.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">No prompts found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any prompt templates matching your search.
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {getSearchSuggestions('').map((term, index) => (
                  <Link 
                    key={index} 
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="no-underline"
                  >
                    <Button variant="outline" size="sm">
                      {term}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-4 border-t text-center text-sm text-muted-foreground">
        <p>Find the perfect prompt template for any AI task</p>
      </footer>
    </div>
  );
};

export default SearchResults;
