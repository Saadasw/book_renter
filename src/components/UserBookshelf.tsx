import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import BookCard from './BookCard';
import AddBookForm from './AddBookForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const UserBookshelf: React.FC = () => {
  const { currentUser, getUserBooks, deleteBook } = useAppContext();

  if (!currentUser) {
    return <p className="text-center text-gray-500 my-4">Please select a user to view their bookshelf.</p>;
  }

  const userBooks = getUserBooks(currentUser.id);

  const handleDeleteBook = (bookId: string) => {
    deleteBook(bookId);
  };

  return (
    <Tabs defaultValue="books">
      <TabsList className="w-full">
        <TabsTrigger value="books" className="flex-1">My Books ({userBooks.length})</TabsTrigger>
        <TabsTrigger value="add" className="flex-1">Add New Book</TabsTrigger>
      </TabsList>
      
      <TabsContent value="books">
        {userBooks.length === 0 ? (
          <p className="text-center text-gray-500 my-4">You don't have any books yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {userBooks.map(book => (
              <div key={book.id} className="relative">
                <BookCard book={book} showRentButton={false} />
                {!book.isRented && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="absolute top-2 right-2"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your book "{book.title}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBook(book.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="add">
        <div className="mt-4">
          <AddBookForm />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default UserBookshelf;
