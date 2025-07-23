import React from 'react';
import '../styles/CategoryCard.css';

function CategoryCard({ title, description, icon }) {
  return (
    <div className="category-card">
      {icon && <span className="icon" aria-hidden="true">{icon}</span>} {/* Added icon display. aria-hidden for decorative icons */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default CategoryCard;