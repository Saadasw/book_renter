import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserSelector from './UserSelector';
import BookSearch from './BookSearch';
import UserBookshelf from './UserBookshelf';
import RentRequestList from './RentRequestList';

const AppLayout: React.FC = () => {
  const { currentUser } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-4">Book Rental App</h1>
        <UserSelector />
      </header>

      <main>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="search" className="flex-1">Search Books</TabsTrigger>
            <TabsTrigger value="bookshelf" className="flex-1">My Bookshelf</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Rent Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="mt-4">
            <BookSearch />
          </TabsContent>
          
          <TabsContent value="bookshelf" className="mt-4">
            <UserBookshelf />
          </TabsContent>
          
          <TabsContent value="requests" className="mt-4">
            <RentRequestList />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2023 Book Rental App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
