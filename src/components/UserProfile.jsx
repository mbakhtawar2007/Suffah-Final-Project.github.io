import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserProfile.css';

function UserProfile({ user }) {
  return (
    <div className="user-profile" aria-label={`Profile of ${user.name}`} role="region">
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className="avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button aria-label="Edit Profile">Edit Profile</button>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
