import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/EditProfileModal.css';

function EditProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const modalRef = useRef(null);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAvatarPreview(user.avatar);
    setAvatarFile(null);
  }, [user]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null);
      setAvatarPreview(user.avatar);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, email, avatar: avatarPreview, avatarFile });
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="edit-profile-modal" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <h2 id="edit-profile-modal">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="avatar-upload-section">
            <img src={avatarPreview} alt="User Avatar" className="avatar-preview" />
            <label htmlFor="avatar-upload" className="upload-button">Change Avatar</label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              aria-label="Upload new avatar image"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Your email"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditProfileModal.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileModal;
