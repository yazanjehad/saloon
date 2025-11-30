// ReviewsSection.jsx
import React, { useRef } from 'react';
import './reviewsSection.css';
import ReviewCard from '../../review/ReviewCard';
import img1 from '../../../assets/imgemp1.png';
import img2 from '../../../assets/imgemp2.png';
import img3 from '../../../assets/imgemp3.png';
import img4 from '../../../assets/imgemp4.png';

const reviewsData = [
  { title: 'Best app for salons & spas', text: 'Absolutely amazing app for booking appointments with salons and spas. Love how easy it is to book at all times of the day/night.', rating: 5, author: 'Jess', location: 'Manchester, UK', avatar: img1 },
  { title: 'Hassle-free hair appointment bookings', text: 'Fresha lets you pick the day, time and stylist, gives a price and timeframe for all services on a simple to use menu. Once you make your booking, you get the confirmation right away. Perfect.', rating: 5, author: 'Pamela', location: 'Dublin, Ireland', avatar: img2 },
  { title: '#1 app for salon online bookings', text: 'Hands down the best app for online appointment bookings. I can find hundreds of services in my area: beauty, tattoos, hair, nails and so much more. Top stylists too.', rating: 5, author: 'Jessica', location: 'Dubai, UAE', avatar: img3 },
  { title: 'Best for pedicure appointments', text: 'I can conveniently plan for pedicures any time or day. Works brilliantly. Just wish my hairdresser was also on it!', rating: 5, author: 'Pat', location: 'Dublin, Ireland', avatar: img4 },
];

const ReviewsSection = () => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
       <div className="reviews-section-container">
      <h2 className="main-title">Reviews</h2>
            <p className="section-subtitle">Employees with the highest ratings</p>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left-arrow" onClick={scrollLeft}>‹</button>
        <div className="reviews-cards-container" ref={containerRef}>
          {reviewsData.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
        <button className="carousel-arrow right-arrow" onClick={scrollRight}>›</button>
      </div>
    </div>
    
  );
};

export default ReviewsSection;
