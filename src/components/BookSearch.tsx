import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import BookCard from './BookCard';
import { Book } from '@/types';

const BookSearch: React.FC = () => {
  const { searchBooks } = useAppContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [maxRentalPrice, setMaxRentalPrice] = useState<number>(100);
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');

  const handleSearch = () => {
    let searchResults = searchBooks(query);
    
    // Apply status filter
    if (statusFilter !== 'all') {
      searchResults = searchResults.filter(book => book.status === statusFilter);
    }
    
    // Apply rental price filter
    if (maxRentalPrice < 100) {
      searchResults = searchResults.filter(book => 
        !book.rentalPrice || book.rentalPrice <= maxRentalPrice
      );
    }
    
    // Apply listing type filter
    if (listingTypeFilter !== 'all') {
      searchResults = searchResults.filter(book => 
        book.listingType === listingTypeFilter || 
        (listingTypeFilter === 'rent' && book.listingType === 'both') ||
        (listingTypeFilter === 'sale' && book.listingType === 'both')
      );
    }
    
    setResults(searchResults);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="sm:w-auto w-full">Search</Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 bg-muted/30 p-4 rounded-md">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Listing Type</label>
            <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by listing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">
              Max Rental Price: ${maxRentalPrice}
            </label>
            <Slider
              value={[maxRentalPrice]}
              min={0}
              max={100}
              step={5}
              onValueChange={(values) => setMaxRentalPrice(values[0])}
              className="py-2"
            />
          </div>
        </div>
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
