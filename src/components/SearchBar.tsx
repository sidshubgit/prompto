
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  initialQuery?: string;
  suggestions?: string[];
  onSearch?: (query: string) => void;
  placeholderText?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  suggestions = [],
  onSearch,
  placeholderText = 'Search for prompts (e.g. "business plan", "meal planner")',
  autoFocus = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    setShowSuggestions(false);
  };

  // Filter suggestions based on current query
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(query.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholderText}
            autoFocus={autoFocus}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="search-button"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in">
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-secondary cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
