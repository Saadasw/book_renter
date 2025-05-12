export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    address?: string;
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
  