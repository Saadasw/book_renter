import { User, Book, RentRequest, BookImage, Message, UserReport } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: true,
    address: '123 Main St, City',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Main St, New York, NY'
    },
    contactNumber: '+1 (555) 123-4567',
    reportCount: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    address: '456 Oak Ave, Town',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '456 Oak Ave, Los Angeles, CA'
    },
    contactNumber: '+1 (555) 987-6543',
    reportCount: 0
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    isAdmin: false,
    address: '789 Pine Rd, Village',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: '789 Pine Rd, Chicago, IL'
    },
    contactNumber: '+1 (555) 456-7890',
    reportCount: 0
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

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Jane, is your book still available?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Yes John, it is still available for rent!',
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '3',
    content: 'Bob, when can I return your book?',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false
  }
];

// Mock User Reports
export const mockUserReports: UserReport[] = [
  {
    id: '1',
    reporterId: '2',
    reportedUserId: '3',
    reason: 'Damaged book upon return',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: 'pending'
  },
  {
    id: '2',
    reporterId: '3',
    reportedUserId: '2',
    reason: 'Failed to return book on time',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    status: 'reviewed'
  }
];
