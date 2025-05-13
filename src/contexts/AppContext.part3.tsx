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
            images: [...(bookImages || []), newImage]
          };
        }
        return b;
      })
    );
  };

  const getBookImages = (bookId: string): BookImage[] => {
    return bookImages.filter(image => image.bookId === bookId);
  };

  // New functions for the requested features
  const updateUserLocation = (userId: string, location: User['location']) => {
    if (!currentUser || (currentUser.id !== userId && !currentUser.isAdmin)) {
      toast({
        title: 'Error',
        description: 'You can only update your own location',
        variant: 'destructive',
      });
      return;
    }

    setUsers(prev => 
      prev.map(user => user.id === userId ? {...user, location} : user)
    );

    toast({
      title: 'Success',
      description: 'Location updated successfully',
    });
  };

  const updateUserContactNumber = (userId: string, contactNumber: string) => {
    if (!currentUser || (currentUser.id !== userId && !currentUser.isAdmin)) {
      toast({
        title: 'Error',
        description: 'You can only update your own contact number',
        variant: 'destructive',
      });
      return;
    }

    setUsers(prev => 
      prev.map(user => user.id === userId ? {...user, contactNumber} : user)
    );

    toast({
      title: 'Success',
      description: 'Contact number updated successfully',
    });
  };

  const sendMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to send messages',
        variant: 'destructive',
      });
      return;
    }

    if (currentUser.id !== messageData.senderId) {
      toast({
        title: 'Error',
        description: 'You can only send messages as yourself',
        variant: 'destructive',
      });
      return;
    }

    const newMessage: Message = {
      ...messageData,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);

    toast({
      title: 'Success',
      description: 'Message sent successfully',
    });
  };

  const getUserMessages = (userId: string): Message[] => {
    return messages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    );
  };