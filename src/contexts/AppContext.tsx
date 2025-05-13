import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { User, Book, RentRequest, BookImage, Message, UserReport } from '@/types';
import { mockUsers, mockBooks, mockRentRequests, mockBookImages, mockMessages, mockUserReports } from '@/data/mockData';

// Update mock books to include new fields
const updatedMockBooks = mockBooks.map(book => ({
  ...book,
  listingType: Math.random() > 0.3 ? 'rent' as const : Math.random() > 0.5 ? 'sale' as const : 'both' as const,
  status: book.isRented ? 'rented' as const : 'available' as const,
  rentalPrice: Math.floor(Math.random() * 50) + 10, // Random price between 10 and 60
  salePrice: Math.floor(Math.random() * 100) + 30, // Random price between 30 and 130
}));

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  users: User[];
  books: Book[];
  rentRequests: RentRequest[];
  bookImages: BookImage[];
  messages: Message[];
  userReports: UserReport[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addBook: (book: Omit<Book, 'id' | 'isRented' | 'rentedTo'>) => void;
  deleteBook: (bookId: string) => void;
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
  updateUserLocation: (userId: string, location: User['location']) => void;
  updateUserContactNumber: (userId: string, contactNumber: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  getUserMessages: (userId: string) => Message[];
  reportUser: (report: Omit<UserReport, 'id' | 'timestamp' | 'status'>) => void;
  getUserProfile: (userId: string) => User | undefined;
  adminDeleteUser: (userId: string) => void;
  adminDeleteBook: (bookId: string) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  users: [],
  books: [],
  rentRequests: [],
  bookImages: [],
  messages: [],
  userReports: [],
  currentUser: null,
  setCurrentUser: () => {},
  addBook: () => {},
  deleteBook: () => {},
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
  updateUserLocation: () => {},
  updateUserContactNumber: () => {},
  sendMessage: () => {},
  getUserMessages: () => [],
  reportUser: () => {},
  getUserProfile: () => undefined,
  adminDeleteUser: () => {},
  adminDeleteBook: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [books, setBooks] = useState<Book[]>(updatedMockBooks);
  const [rentRequests, setRentRequests] = useState<RentRequest[]>(mockRentRequests);
  const [bookImages, setBookImages] = useState<BookImage[]>(mockBookImages);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [userReports, setUserReports] = useState<UserReport[]>(mockUserReports);
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
      status: 'available',
    };

    setBooks(prev => [...prev, newBook]);
    toast({
      title: 'Success',
      description: 'Book added successfully',
    });
  };

  const deleteBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) {
      toast({
        title: 'Error',
        description: 'Book not found',
        variant: 'destructive',
      });
      return;
    }

    if (book.status !== 'available') {
      toast({
        title: 'Error',
        description: 'Cannot delete a book that is currently rented or sold',
        variant: 'destructive',
      });
      return;
    }

    if (book.ownerId !== currentUser?.id && !currentUser?.isAdmin) {
      toast({
        title: 'Error',
        description: 'You can only delete your own books',
        variant: 'destructive',
      });
      return;
    }

    setBooks(prev => prev.filter(b => b.id !== bookId));
    setBookImages(prev => prev.filter(img => img.bookId !== bookId));
    setRentRequests(prev => prev.filter(req => req.bookId !== bookId));

    toast({
      title: 'Success',
      description: 'Book deleted successfully',
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
    if (!book || book.status !== 'available') return;

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
      title: 'Request Sent',
      description: 'Your rental request has been sent to the owner',
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
        {...b, isRented: true, rentedTo: request.requesterId, status: 'rented'} : b)
    );
    
    toast({
      title: 'Request Accepted',
      description: 'You have accepted the rental request',
    });
  };

  const rejectRentRequest = (requestId: string) => {
    setRentRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, status: 'rejected'} : r)
    );
    
    toast({
      title: 'Request Rejected',
      description: 'You have rejected the rental request',
    });
  };

  const completePayment = (requestId: string) => {
    setRentRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, paymentStatus: 'completed'} : r)
    );
    
    toast({
      title: 'Payment Completed',
      description: 'Payment has been marked as completed',
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
    const newImage: BookImage = {
      ...imageData,
      id: uuidv4(),
    };
    setBookImages(prev => [...prev, newImage]);
  };

  const getBookImages = (bookId: string): BookImage[] => {
    return bookImages.filter(image => image.bookId === bookId);
  };

  const updateUserLocation = (userId: string, location: User['location']) => {
    setUsers(prev => 
      prev.map(user => user.id === userId ? {...user, location} : user)
    );
  };

  const updateUserContactNumber = (userId: string, contactNumber: string) => {
    setUsers(prev => 
      prev.map(user => user.id === userId ? {...user, contactNumber} : user)
    );
  };

  const sendMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...messageData,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getUserMessages = (userId: string): Message[] => {
    return messages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    );
  };

  const reportUser = (reportData: Omit<UserReport, 'id' | 'timestamp' | 'status'>) => {
    const newReport: UserReport = {
      ...reportData,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setUserReports(prev => [...prev, newReport]);
  };

  const getUserProfile = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const adminDeleteUser = (userId: string) => {
    if (!currentUser?.isAdmin) return;
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const adminDeleteBook = (bookId: string) => {
    if (!currentUser?.isAdmin) return;
    setBooks(prev => prev.filter(book => book.id !== bookId));
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
        messages,
        userReports,
        currentUser,
        setCurrentUser,
        addBook,
        deleteBook,
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
        updateUserLocation,
        updateUserContactNumber,
        sendMessage,
        getUserMessages,
        reportUser,
        getUserProfile,
        adminDeleteUser,
        adminDeleteBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
