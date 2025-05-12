import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BookCard from './BookCard';

const BookSearch: React.FC = () => {
  const { searchBooks } = useAppContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchBooks>>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const searchResults = searchBooks(query);
    setResults(searchResults);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {hasSearched && (
        <div>
          <h3 className="text-lg font-medium mb-2">Search Results ({results.length})</h3>
          {results.length === 0 ? (
            <p className="text-gray-500">No books found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
