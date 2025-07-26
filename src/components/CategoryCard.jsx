import React from 'react';
import '../styles/CategoryCard.css';

function CategoryCard({ title, description, icon }) {
  return (
    <div className="category-card" role="button" tabIndex="0">
      {icon && <span className="icon" aria-hidden="true">{icon}</span>}
      <h3 className="category-title">{title}</h3>
      <p className="category-description">{description}</p>
    </div>
  );
}

export default CategoryCard;
