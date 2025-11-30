// ReviewCard.jsx
import React from 'react';
import './reviewCard.css';

// مكون النجوم
const StarRating = ({ count }) => {
  const stars = '★'.repeat(count);
  return <div className="stars-container">{stars}</div>;
};

const ReviewCard = ({ review }) => {
  const { title, text, rating, author, location, avatar } = review;

  return (
    <div className="review-card">
      <StarRating count={rating} />
      
      <h3 className="review-title">{title}</h3>
      
      <p className="review-text">{text}</p>
      
      <div className="reviewer-info">
        <img 
          src={avatar || 'default_avatar.jpg'} 
          alt={author} 
          className="reviewer-avatar" 
        />
        <div className="reviewer-details">
          <p className="reviewer-name">{author}</p>
          <p className="reviewer-location">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
