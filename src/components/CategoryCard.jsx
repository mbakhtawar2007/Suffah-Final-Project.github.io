import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CategoryCard.css';

function CategoryCard({ title, description }) {
  return (
    <div 
      className="category-card" 
      role="article" 
      aria-labelledby={`category-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <h3 id={`category-${title.replace(/\s+/g, '-').toLowerCase()}`}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CategoryCard;
