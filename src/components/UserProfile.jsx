import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/UserProfile.css';
import EditProfileModal from './EditProfileModal';

function UserProfile({ user: { name, email, avatar } }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = (updatedUser) => {
    // Logic to save the updated user details
    console.log('Updated User:', updatedUser);
  };

  return (
    <div className="user-profile" aria-label={`Profile of ${name}`} role="region">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="avatar"
      />
      <h2>{name}</h2>
      <p>{email}</p>
      <button aria-label="Edit Profile" onClick={() => setModalOpen(true)}>
        Edit Profile
      </button>
      {isModalOpen && (
        <EditProfileModal
          user={{ name, email, avatar }}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
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
