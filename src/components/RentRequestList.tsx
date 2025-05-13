import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RentRequestList: React.FC = () => {
  const { rentRequests, currentUser, acceptRentRequest, rejectRentRequest, completePayment, books, users } = useAppContext();

  if (!currentUser) return null;

  const userRequests = rentRequests.filter(
    req => req.ownerId === currentUser.id || req.requesterId === currentUser.id
  );

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book?.title || 'Unknown Book';
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  if (userRequests.length === 0) {
    return <p className="text-center text-gray-500 my-4">No rent requests found.</p>;
  }

  return (
    <div className="space-y-4">
      {userRequests.map(request => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{getBookTitle(request.bookId)}</span>
              <Badge variant={request.status === 'pending' ? 'outline' : 
                      request.status === 'accepted' ? 'default' : 'destructive'}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Requester:</span> {getUserName(request.requesterId)}
              </p>
              <p>
                <span className="font-medium">Owner:</span> {getUserName(request.ownerId)}
              </p>
              <p>
                <span className="font-medium">Request Date:</span> {new Date(request.requestDate).toLocaleDateString()}
              </p>
              {request.deliveryAddress && (
                <p>
                  <span className="font-medium">Delivery Address:</span> {request.deliveryAddress}
                </p>
              )}
              <p>
                <span className="font-medium">Payment Status:</span> {request.paymentStatus}
              </p>
              
              <div className="flex gap-2 mt-4">
                {request.status === 'pending' && request.ownerId === currentUser.id && (
                  <>
                    <Button onClick={() => acceptRentRequest(request.id)} variant="default" size="sm">
                      Accept
                    </Button>
                    <Button onClick={() => rejectRentRequest(request.id)} variant="destructive" size="sm">
                      Reject
                    </Button>
                  </>
                )}
                
                {request.status === 'accepted' && 
                 request.paymentStatus === 'pending' && 
                 request.requesterId === currentUser.id && (
                  <Button onClick={() => completePayment(request.id)} variant="default" size="sm">
                    Complete Payment
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RentRequestList;
