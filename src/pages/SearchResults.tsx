
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import PromptCard, { PromptTemplate } from '@/components/PromptCard';
import { searchPrompts, getSearchSuggestions } from '@/utils/searchUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { Skeleton } from '@/components/ui/skeleton';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { recentSearches, addRecentSearch } = useRecentSearches();

  useEffect(() => {
    let isMounted = true;
    
    // Don't run search if query is empty
    if (!query.trim()) {
      setLoading(false);
      setResults([]);
      return;
    }
    
    setLoading(true);
    console.log("Searching for:", query);
    
    // Fetch results with a consistent minimum loading time
    const fetchResults = async () => {
      try {
        const startTime = Date.now();
        
        // Get search results
        const searchResults = searchPrompts(query);
        console.log("Found results:", searchResults.length);
        
        // Ensure minimum loading time of 600ms to avoid flickering
        const elapsedTime = Date.now() - startTime;
        const minimumDelay = 600;
        
        if (elapsedTime < minimumDelay) {
          await new Promise(resolve => setTimeout(resolve, minimumDelay - elapsedTime));
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setResults(searchResults);
          setLoading(false);
          
          // Add first result to recent searches if available
          if (searchResults.length > 0) {
            addRecentSearch(searchResults[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        if (isMounted) {
          setLoading(false);
          setResults([]);
        }
      }
    };
    
    fetchResults();
    
    return () => {
      isMounted = false;
    };
  }, [query, addRecentSearch]);

  // Render loading skeletons
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-64 w-full" />
      ))}
    </div>
  );

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

        <div className="min-h-[50vh]">
          {loading ? (
            renderSkeletons()
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
        </div>

        {!loading && recentSearches.length > 1 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {recentSearches
                .filter(search => search.id !== (results[0]?.id || ''))
                .slice(0, 3)
                .map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
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
