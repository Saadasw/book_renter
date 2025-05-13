import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookSearch from './BookSearch';
import UserBookshelf from './UserBookshelf';
import RentRequestList from './RentRequestList';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { currentUser } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow bat-container py-8 px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-4 text-foreground">
            BOOK RENTAL & SALE SYSTEM
          </h1>
        </div>

        <div className="bat-card p-2 sm:p-4">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="w-full mb-4 bg-muted flex flex-wrap">
              <TabsTrigger 
                value="search" 
                className="flex-1 font-orbitron text-xs uppercase tracking-wider"
              >
                Search Books
              </TabsTrigger>
              {currentUser && (
                <>
                  <TabsTrigger 
                    value="bookshelf" 
                    className="flex-1 font-orbitron text-xs uppercase tracking-wider"
                  >
                    My Bookshelf
                  </TabsTrigger>
                  <TabsTrigger 
                    value="requests" 
                    className="flex-1 font-orbitron text-xs uppercase tracking-wider"
                  >
                    Rent Requests
                  </TabsTrigger>
                </>
              )}
            </TabsList>
            
            <TabsContent value="search" className="mt-4 animate-fade-in">
              <BookSearch />
            </TabsContent>
            
            {currentUser && (
              <>
                <TabsContent value="bookshelf" className="mt-4 animate-fade-in">
                  <UserBookshelf />
                </TabsContent>
                
                <TabsContent value="requests" className="mt-4 animate-fade-in">
                  <RentRequestList />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
