import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  contact_number?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  is_admin: boolean;
  profile_visibility?: string;
}

interface ProfileVisibility {
  visible_name: boolean;
  visible_email: boolean;
  visible_contact: boolean;
  visible_address: boolean;
  visible_location: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  profileVisibility: ProfileVisibility | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateProfileVisibility: (data: Partial<ProfileVisibility>) => Promise<void>;
  getPublicProfile: (userId: string) => Promise<Partial<UserProfile> | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileVisibility, setProfileVisibility] = useState<ProfileVisibility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setProfileVisibility(null);
        }
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch profile visibility settings
      const { data: visibilityData, error: visibilityError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (visibilityError) throw visibilityError;
      setProfileVisibility(visibilityData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email, name }]);

      if (profileError) throw profileError;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('id', user.id);

    if (error) throw error;
    
    // Update local state
    setProfile(prev => prev ? { ...prev, ...data } : null);
  };

  const updateProfileVisibility = async (data: Partial<ProfileVisibility>) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) throw error;
    
    // Update local state
    setProfileVisibility(prev => prev ? { ...prev, ...data } : null);
  };

  const getPublicProfile = async (userId: string): Promise<Partial<UserProfile> | null> => {
    try {
      // Get user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      // Get visibility settings
      const { data: visibilityData, error: visibilityError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (visibilityError) throw visibilityError;

      // Filter the profile based on visibility settings
      const publicProfile: Partial<UserProfile> = {};
      
      // ID is always visible
      publicProfile.id = userData.id;
      
      // Apply visibility rules
      if (visibilityData.visible_name) publicProfile.name = userData.name;
      if (visibilityData.visible_email) publicProfile.email = userData.email;
      if (visibilityData.visible_contact) publicProfile.contact_number = userData.contact_number;
      if (visibilityData.visible_address) publicProfile.address = userData.address;
      if (visibilityData.visible_location) {
        publicProfile.latitude = userData.latitude;
        publicProfile.longitude = userData.longitude;
      }

      return publicProfile;
    } catch (error) {
      console.error('Error fetching public profile:', error);
      return null;
    }
  };

  const value = {
    user,
    profile,
    profileVisibility,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateProfileVisibility,
    getPublicProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
