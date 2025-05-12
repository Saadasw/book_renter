import React, { useState } from 'react';
import { Book } from '@/types';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookImageGallery from './BookImageGallery';
import BookImageUploader from './BookImageUploader';

interface BookDetailProps {
  book: Book;
  showRentButton?: boolean;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, showRentButton = true }) => {
  const { currentUser, requestRent, getBookOwner, getBookImages, addBookImage } = useAppContext();
  const [showUploader, setShowUploader] = useState(false);
  
  const owner = getBookOwner(book.id);
  const bookImages = getBookImages(book.id);
  
  const handleRentRequest = () => {
    if (currentUser) {
      requestRent(book.id, currentUser.id);
    }
  };

  const isOwner = currentUser?.id === book.ownerId;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="line-clamp-1">{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-100">
              <img 
                src={book.imageUrl || 'https://placehold.co/200x300'} 
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Author: {book.author}</p>
              <p className="text-sm text-gray-500">Owner: {owner?.name || 'Unknown'}</p>
              <div className="flex items-center gap-2">
                <Badge variant={book.isRented ? "destructive" : "outline"}>
                  {book.isRented ? 'Rented' : 'Available'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <BookImageGallery images={bookImages} title={book.title} />
            
            {isOwner && (
              <div className="space-y-2">
                {!showUploader ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowUploader(true)}
                    className="w-full"
                  >
                    Add Condition Images
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <BookImageUploader 
                      bookId={book.id} 
                      onImageUpload={(image) => {
                        addBookImage(image);
                        setShowUploader(false);
                      }} 
                    />
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowUploader(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
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

export default BookDetail;
