import React from 'react';
import { Book, User } from '@/types';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import BookDetail from './BookDetail';

interface BookCardProps {
  book: Book;
  showRentButton?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showRentButton = true }) => {
  const { currentUser, requestRent, getBookOwner, getBookImages } = useAppContext();
  
  const owner = getBookOwner(book.id);
  const bookImages = getBookImages(book.id);
  const hasConditionImages = bookImages && bookImages.length > 0;
  
  const handleRentRequest = () => {
    if (currentUser) {
      requestRent(book.id, currentUser.id);
    }
  };

  const getStatusBadge = () => {
    switch(book.status) {
      case 'rented':
        return <Badge variant="destructive" className="font-orbitron text-xs">RENTED</Badge>;
      case 'sold':
        return <Badge variant="destructive" className="font-orbitron text-xs">SOLD</Badge>;
      default:
        return <Badge variant="outline" className="font-orbitron text-xs">AVAILABLE</Badge>;
    }
  };

  const getListingTypeBadge = () => {
    switch(book.listingType) {
      case 'rent':
        return <Badge variant="secondary" className="font-orbitron text-xs">RENT</Badge>;
      case 'sale':
        return <Badge variant="secondary" className="font-orbitron text-xs">SALE</Badge>;
      case 'both':
        return <Badge variant="secondary" className="font-orbitron text-xs">RENT/SALE</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bat-card overflow-hidden transition-all duration-300 hover:shadow-bat">
      <CardHeader className="bg-muted/30 pb-2">
        <CardTitle className="line-clamp-1 font-orbitron text-lg">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-muted cursor-pointer hover:opacity-90 transition-opacity border border-accent/20">
                <img 
                  src={book.imageUrl || 'https://placehold.co/200x300'} 
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl bg-card">
              <BookDetail book={book} showRentButton={showRentButton} />
            </DialogContent>
          </Dialog>
          <p className="text-sm text-muted-foreground">Author: {book.author}</p>
          <p className="text-sm text-muted-foreground">Owner: {owner?.name || 'Unknown'}</p>
          
          {/* Pricing information */}
          {book.rentalPrice && (
            <p className="text-sm font-medium">Rent: ${book.rentalPrice.toFixed(2)}/week</p>
          )}
          {book.salePrice && (
            <p className="text-sm font-medium">Buy: ${book.salePrice.toFixed(2)}</p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge()}
            {getListingTypeBadge()}
            {hasConditionImages && (
              <Badge variant="secondary" className="font-orbitron text-xs">
                {bookImages.length} {bookImages.length === 1 ? 'IMAGE' : 'IMAGES'}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t border-border">
        {showRentButton && currentUser && book.status === 'available' && book.ownerId !== currentUser.id && (
          <div className="w-full space-y-2">
            {(book.listingType === 'rent' || book.listingType === 'both') && (
              <Button onClick={handleRentRequest} className="w-full bat-button">
                REQUEST TO RENT
              </Button>
            )}
            {(book.listingType === 'sale' || book.listingType === 'both') && (
              <Button variant="outline" className="w-full bat-button">
                BUY NOW
              </Button>
            )}
          </div>
        )}
        {book.status !== 'available' && (
          <p className="text-sm text-muted-foreground w-full text-center font-orbitron">
            {book.status === 'rented' ? 'CURRENTLY RENTED' : 'SOLD OUT'}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;