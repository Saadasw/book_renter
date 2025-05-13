export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [books, setBooks] = useState<Book[]>(mockBooks);
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

    if (book.isRented) {
      toast({
        title: 'Error',
        description: 'Cannot delete a book that is currently rented',
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
    // Also delete any related book images
    setBookImages(prev => prev.filter(img => img.bookId !== bookId));
    // Also delete any related rent requests
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