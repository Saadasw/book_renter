import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useAuth } from '@/contexts/AuthContext';

// Profile component that includes profile update and visibility settings
const Profile: React.FC = () => {
  const { profile, profileVisibility, updateProfile, updateProfileVisibility, signOut } = useAuth();
  
  if (!profile) return <div>Loading profile...</div>;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const contactNumber = (form.elements.namedItem('contactNumber') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    
    try {
      await updateProfile({
        name,
        contact_number: contactNumber,
        address
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleUpdateVisibility = async (field: string, checked: boolean) => {
    try {
      const update = { [field]: checked };
      await updateProfileVisibility(update);
    } catch (error) {
      console.error('Error updating visibility:', error);
      alert('Failed to update visibility settings');
    }
  };

  return (
    <div className="space-y-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={profile.name} 
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input 
              type="text" 
              name="contactNumber" 
              defaultValue={profile.contact_number || ''} 
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input 
              type="text" 
              name="address" 
              defaultValue={profile.address || ''} 
              className="w-full p-2 border rounded"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Profile Visibility</h2>
        <p className="text-sm text-gray-600 mb-4">
          Control what information others can see about you
        </p>
        
        {profileVisibility && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Display Name</label>
              <input 
                type="checkbox" 
                checked={profileVisibility.visible_name} 
                onChange={(e) => handleUpdateVisibility('visible_name', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Address</label>
              <input 
                type="checkbox" 
                checked={profileVisibility.visible_email} 
                onChange={(e) => handleUpdateVisibility('visible_email', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Contact Number</label>
              <input 
                type="checkbox" 
                checked={profileVisibility.visible_contact} 
                onChange={(e) => handleUpdateVisibility('visible_contact', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Address</label>
              <input 
                type="checkbox" 
                checked={profileVisibility.visible_address} 
                onChange={(e) => handleUpdateVisibility('visible_address', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Location</label>
              <input 
                type="checkbox" 
                checked={profileVisibility.visible_location} 
                onChange={(e) => handleUpdateVisibility('visible_location', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t">
        <button 
          onClick={() => signOut()} 
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

// View Profile component to see other users' profiles
const ViewProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { getPublicProfile } = useAuth();
  const [publicProfile, setPublicProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getPublicProfile(userId);
        setPublicProfile(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, getPublicProfile]);

  if (loading) return <div>Loading profile...</div>;
  if (!publicProfile) return <div>Profile not found</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="space-y-4">
        {publicProfile.name && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p>{publicProfile.name}</p>
          </div>
        )}
        
        {publicProfile.email && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p>{publicProfile.email}</p>
          </div>
        )}
        
        {publicProfile.contact_number && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Contact</h2>
            <p>{publicProfile.contact_number}</p>
          </div>
        )}
        
        {publicProfile.address && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Address</h2>
            <p>{publicProfile.address}</p>
          </div>
        )}
        
        {publicProfile.latitude && publicProfile.longitude && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Location</h2>
            <p>Lat: {publicProfile.latitude}, Long: {publicProfile.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Auth routes component
const AuthRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/signup" element={!user ? <SignUpForm /> : <Navigate to="/profile" />} />
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/profile" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/users/:userId" element={<ViewProfile userId="1" />} />
    </Routes>
  );
};

export { AuthRoutes, Profile, ViewProfile };
