// SalonCard.jsx
import React from 'react';
import './salonCard.css';

const SalonCard = ({ salon }) => {
  const { name, rating, reviews, location, services, image } = salon;

  return (
    <div className="salon-card">
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="card-details">
        <h3 className="salon-name">{name}</h3>
        <div className="rating-info">
          <span className="stars">⭐</span>
          <span className="rating">{rating}</span>
          <span className="reviews">({reviews} reviews)</span>
        </div>
        <p className="location-services">
          📍 {location}
          <br />
          {services}
        </p>
        <button className="view-details-button">View Details</button>
      </div>
    </div>
  );
};

export default SalonCard;
