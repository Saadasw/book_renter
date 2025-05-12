import { User, Book, RentRequest, BookImage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: true,
    address: '123 Main St, City'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    address: '456 Oak Ave, Town'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    isAdmin: false,
    address: '789 Pine Rd, Village'
  }
];

// Mock Book Images
export const mockBookImages: BookImage[] = [
  {
    id: '1',
    bookId: '1',
    imageUrl: 'https://placehold.co/400x600?text=Front+Cover',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '2',
    bookId: '1',
    imageUrl: 'https://placehold.co/400x600?text=Back+Cover',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '3',
    bookId: '2',
    imageUrl: 'https://placehold.co/400x600?text=Condition',
    uploadedAt: new Date().toISOString()
  }
];

// Mock Books
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    ownerId: '1',
    isRented: false,
    imageUrl: 'https://placehold.co/200x300',
    images: mockBookImages.filter(img => img.bookId === '1')
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    ownerId: '1',
    isRented: true,
    rentedTo: '3',
    imageUrl: 'https://placehold.co/200x300',
    images: mockBookImages.filter(img => img.bookId === '2')
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    ownerId: '2',
    isRented: false,
    imageUrl: 'https://placehold.co/200x300'
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    ownerId: '3',
    isRented: false,
    imageUrl: 'https://placehold.co/200x300'
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    ownerId: '2',
    isRented: true,
    rentedTo: '1',
    imageUrl: 'https://placehold.co/200x300'
  }
];

// Mock Rent Requests
export const mockRentRequests: RentRequest[] = [
  {
    id: '1',
    bookId: '3',
    requesterId: '1',
    ownerId: '2',
    status: 'pending',
    requestDate: new Date().toISOString(),
    deliveryAddress: '123 Main St, City',
    paymentStatus: 'pending'
  },
  {
    id: '2',
    bookId: '4',
    requesterId: '2',
    ownerId: '3',
    status: 'accepted',
    requestDate: new Date().toISOString(),
    deliveryAddress: '456 Oak Ave, Town',
    paymentStatus: 'completed'
  }
];
