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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity">
                <img 
                  src={book.imageUrl || 'https://placehold.co/200x300'} 
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <BookDetail book={book} showRentButton={showRentButton} />
            </DialogContent>
          </Dialog>
          <p className="text-sm text-gray-500">Author: {book.author}</p>
          <p className="text-sm text-gray-500">Owner: {owner?.name || 'Unknown'}</p>
          <div className="flex items-center gap-2">
            <Badge variant={book.isRented ? "destructive" : "outline"}>
              {book.isRented ? 'Rented' : 'Available'}
            </Badge>
            {hasConditionImages && (
              <Badge variant="secondary">
                {bookImages.length} condition {bookImages.length === 1 ? 'image' : 'images'}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {showRentButton && currentUser && !book.isRented && book.ownerId !== currentUser.id && (
          <Button onClick={handleRentRequest} className="w-full">
            Request to Rent
          </Button>
        )}
        {book.isRented && (
          <p className="text-sm text-gray-500 w-full text-center">
            Currently rented
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
