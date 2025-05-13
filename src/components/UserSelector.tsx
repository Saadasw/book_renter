import React from 'react';
import { User } from '@/types';
import { useAppContext } from '@/contexts/AppContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useAppContext();

  const handleUserChange = (userId: string) => {
    const selectedUser = users.find(user => user.id === userId) || null;
    setCurrentUser(selectedUser);
  };

  return (
    <div className="mb-4">
      <Select
        value={currentUser?.id || ''}
        onValueChange={handleUserChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.name} {user.isAdmin ? '(Admin)' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelector;
