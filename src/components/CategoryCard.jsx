import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CategoryCard.css';

function CategoryCard({ title, description }) {
  return (
    <div className="category-card" 
         onMouseEnter={() => console.log('Hovered!')} 
         onMouseLeave={() => console.log('Unhovered!')}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CategoryCard;
