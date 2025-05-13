  const reportUser = (reportData: Omit<UserReport, 'id' | 'timestamp' | 'status'>) => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to report a user',
        variant: 'destructive',
      });
      return;
    }

    if (currentUser.id !== reportData.reporterId) {
      toast({
        title: 'Error',
        description: 'You can only submit reports as yourself',
        variant: 'destructive',
      });
      return;
    }

    const newReport: UserReport = {
      ...reportData,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    setUserReports(prev => [...prev, newReport]);

    // Increment report count for the reported user
    setUsers(prev => 
      prev.map(user => {
        if (user.id === reportData.reportedUserId) {
          return {
            ...user,
            reportCount: (user.reportCount || 0) + 1
          };
        }
        return user;
      })
    );

    toast({
      title: 'Success',
      description: 'User reported successfully',
    });
  };

  const getUserProfile = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const adminDeleteUser = (userId: string) => {
    if (!currentUser?.isAdmin) {
      toast({
        title: 'Error',
        description: 'Only admins can delete users',
        variant: 'destructive',
      });
      return;
    }

    // Delete the user
    setUsers(prev => prev.filter(user => user.id !== userId));

    // Delete all books owned by the user
    const userBooks = books.filter(book => book.ownerId === userId);
    userBooks.forEach(book => {
      setBooks(prev => prev.filter(b => b.id !== book.id));
      setBookImages(prev => prev.filter(img => img.bookId !== book.id));
    });

    // Delete all rent requests involving the user
    setRentRequests(prev => 
      prev.filter(req => req.requesterId !== userId && req.ownerId !== userId)
    );

    // Delete all messages involving the user
    setMessages(prev => 
      prev.filter(msg => msg.senderId !== userId && msg.receiverId !== userId)
    );

    // Delete all reports involving the user
    setUserReports(prev => 
      prev.filter(report => report.reporterId !== userId && report.reportedUserId !== userId)
    );

    toast({
      title: 'Success',
      description: 'User deleted successfully',
    });
  };

  const adminDeleteBook = (bookId: string) => {
    if (!currentUser?.isAdmin) {
      toast({
        title: 'Error',
        description: 'Only admins can delete any book',
        variant: 'destructive',
      });
      return;
    }

    // Delete the book
    setBooks(prev => prev.filter(book => book.id !== bookId));
    
    // Delete related images
    setBookImages(prev => prev.filter(img => img.bookId !== bookId));
    
    // Delete related rent requests
    setRentRequests(prev => prev.filter(req => req.bookId !== bookId));

    toast({
      title: 'Success',
      description: 'Book deleted successfully',
    });
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
