import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { User, Book, RentRequest, BookImage } from '@/types';
import { mockUsers, mockBooks, mockRentRequests, mockBookImages } from '@/data/mockData';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  users: User[];
  books: Book[];
  rentRequests: RentRequest[];
  bookImages: BookImage[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addBook: (book: Omit<Book, 'id' | 'isRented' | 'rentedTo'>) => void;
  searchBooks: (query: string) => Book[];
  requestRent: (bookId: string, requesterId: string) => void;
  acceptRentRequest: (requestId: string) => void;
  rejectRentRequest: (requestId: string) => void;
  completePayment: (requestId: string) => void;
  getUserBooks: (userId: string) => Book[];
  getBookOwner: (bookId: string) => User | undefined;
  getUserRentRequests: (userId: string) => RentRequest[];
  addBookImage: (image: Omit<BookImage, 'id'>) => void;
  getBookImages: (bookId: string) => BookImage[];
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  users: [],
  books: [],
  rentRequests: [],
  bookImages: [],
  currentUser: null,
  setCurrentUser: () => {},
  addBook: () => {},
  searchBooks: () => [],
  requestRent: () => {},
  acceptRentRequest: () => {},
  rejectRentRequest: () => {},
  completePayment: () => {},
  getUserBooks: () => [],
  getBookOwner: () => undefined,
  getUserRentRequests: () => [],
  addBookImage: () => {},
  getBookImages: () => [],
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [rentRequests, setRentRequests] = useState<RentRequest[]>(mockRentRequests);
  const [bookImages, setBookImages] = useState<BookImage[]>(mockBookImages);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // Default to first user for demo

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addBook = (bookData: Omit<Book, 'id' | 'isRented' | 'rentedTo'>) => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add a book',
        variant: 'destructive',
      });
      return;
    }

    const newBook: Book = {
      ...bookData,
      id: uuidv4(),
      isRented: false,
      ownerId: currentUser.id,
    };

    setBooks(prev => [...prev, newBook]);
    toast({
      title: 'Success',
      description: 'Book added successfully',
    });
  };

  const searchBooks = (query: string): Book[] => {
    if (!query) return books;
    
    const lowerQuery = query.toLowerCase();
    return books.filter(
      book => book.title.toLowerCase().includes(lowerQuery) || 
              book.author.toLowerCase().includes(lowerQuery)
    );
  };

  const requestRent = (bookId: string, requesterId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) {
      toast({
        title: 'Error',
        description: 'Book not found',
        variant: 'destructive',
      });
      return;
    }

    if (book.isRented) {
      toast({
        title: 'Error',
        description: 'This book is already rented',
        variant: 'destructive',
      });
      return;
    }

    const newRequest: RentRequest = {
      id: uuidv4(),
      bookId,
      requesterId,
      ownerId: book.ownerId,
      status: 'pending',
      requestDate: new Date().toISOString(),
      paymentStatus: 'pending',
    };

    setRentRequests(prev => [...prev, newRequest]);
    toast({
      title: 'Success',
      description: 'Rent request sent successfully',
    });
  };

  const acceptRentRequest = (requestId: string) => {
    const request = rentRequests.find(r => r.id === requestId);
    if (!request) return;

    setRentRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, status: 'accepted'} : r)
    );

    setBooks(prev => 
      prev.map(b => b.id === request.bookId ? 
        {...b, isRented: true, rentedTo: request.requesterId} : b)
    );

    toast({
      title: 'Success',
      description: 'Rent request accepted',
    });
  };

  const rejectRentRequest = (requestId: string) => {
    setRentRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, status: 'rejected'} : r)
    );

    toast({
      title: 'Info',
      description: 'Rent request rejected',
    });
  };

  const completePayment = (requestId: string) => {
    setRentRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, paymentStatus: 'completed'} : r)
    );

    toast({
      title: 'Success',
      description: 'Payment completed successfully',
    });
  };

  const getUserBooks = (userId: string): Book[] => {
    return books.filter(book => book.ownerId === userId);
  };

  const getBookOwner = (bookId: string): User | undefined => {
    const book = books.find(b => b.id === bookId);
    if (!book) return undefined;
    return users.find(user => user.id === book.ownerId);
  };

  const getUserRentRequests = (userId: string): RentRequest[] => {
    return rentRequests.filter(
      req => req.requesterId === userId || req.ownerId === userId
    );
  };

  const addBookImage = (imageData: Omit<BookImage, 'id'>) => {
    const book = books.find(b => b.id === imageData.bookId);
    if (!book) {
      toast({
        title: 'Error',
        description: 'Book not found',
        variant: 'destructive',
      });
      return;
    }

    if (book.ownerId !== currentUser?.id) {
      toast({
        title: 'Error',
        description: 'You can only add images to your own books',
        variant: 'destructive',
      });
      return;
    }

    const newImage: BookImage = {
      ...imageData,
      id: uuidv4(),
    };

    setBookImages(prev => [...prev, newImage]);
    
    // Update the book with the new image
    setBooks(prev => 
      prev.map(b => {
        if (b.id === imageData.bookId) {
          const bookImages = getBookImages(b.id);
          return {
            ...b,
            images: [...bookImages, newImage]
          };
        }
        return b;
      })
    );
  };

  const getBookImages = (bookId: string): BookImage[] => {
    return bookImages.filter(image => image.bookId === bookId);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        users,
        books,
        rentRequests,
        bookImages,
        currentUser,
        setCurrentUser,
        addBook,
        searchBooks,
        requestRent,
        acceptRentRequest,
        rejectRentRequest,
        completePayment,
        getUserBooks,
        getBookOwner,
        getUserRentRequests,
        addBookImage,
        getBookImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
