import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { User, Book, RentRequest, BookImage, Message, UserReport } from '@/types';
import { mockUsers, mockBooks, mockRentRequests, mockBookImages, mockMessages, mockUserReports } from '@/data/mockData';

// Update mock books to include new fields
const updatedMockBooks = mockBooks.map(book => ({
  ...book,
  listingType: 'rent' as const,
  status: book.isRented ? 'rented' as const : 'available' as const,
  rentalPrice: Math.floor(Math.random() * 50) + 10, // Random price between 10 and 60
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
