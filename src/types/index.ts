export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  contactNumber?: string;
  reportCount?: number;
}

export interface BookImage {
  id: string;
  bookId: string;
  imageUrl: string;
  uploadedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  ownerId: string;
  isRented: boolean;
  rentedTo?: string;
  imageUrl?: string;
  images?: BookImage[];
  rentalPrice?: number;
  salePrice?: number;
  listingType: 'rent' | 'sale' | 'both';
  status: 'available' | 'rented' | 'sold';
}

export interface RentRequest {
  id: string;
  bookId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string;
  deliveryAddress?: string;
  paymentStatus?: 'pending' | 'completed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface UserReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'dismissed';
}

export interface UserProfile {
  userId: string;
  bio?: string;
  profileImage?: string;
  preferences?: {
    showEmail: boolean;
    showAddress: boolean;
    showPhone: boolean;
  };
}
