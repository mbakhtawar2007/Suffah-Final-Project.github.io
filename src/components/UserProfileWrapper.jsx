import React from 'react';
import UserProfile from './UserProfile';
import { useAuth } from '../context/AuthContext';

function UserProfileWrapper() {
  const { user } = useAuth();
  return <UserProfile user={user} />;
}

export default UserProfileWrapper;
