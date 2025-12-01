import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/UserProfile.css';
import EditProfileModal from './EditProfileModal';

function UserProfile({ user: { name, email, avatar } }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = (updatedUser) => {
    // Update user profile in app state or backend
    setModalOpen(false);
  };

  return (
    <section
      className="user-profile"
      aria-label={`User profile for ${name}`}
      role="region"
    >
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="avatar"
        loading="lazy"
      />
      <h2 className="user-name">{name}</h2>
      <p className="user-email">{email}</p>
      <button
        className="edit-profile-button"
        onClick={() => setModalOpen(true)}
        aria-label="Edit profile"
      >
        Edit Profile
      </button>

      {isModalOpen && (
        <EditProfileModal
          user={{ name, email, avatar }}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
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
