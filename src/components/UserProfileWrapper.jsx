import React from 'react';
import UserProfile from './UserProfile';
import { useAuth } from '../context/AuthContext';

function UserProfileWrapper() {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user profile...</p>; // or handle unauthorized state
  }

  return <UserProfile user={user} />;
}

export default UserProfileWrapper;
