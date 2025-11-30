// FeaturedSalons.jsx
import React, { useRef } from 'react';
import './featuredSalons.css';
import SalonCard from '../../saloon/SalonCard';
import saloonimg from '../../../assets/saloonimg.jpg';
import saloonimg2 from '../../../assets/saloonimg2.jpg';
import saloonimg3 from '../../../assets/saloonimg3.jpg';
import saloonimg4 from '../../../assets/saloonimg4.jpg';

const salonsData = [
  { name: 'Hair Haven Studio', rating: 4.6, reviews: 365, location: 'New York', services: 'Haircut · Styling · Color', image: saloonimg },
  { name: 'Glamour Glow Artistry', rating: 4.6, reviews: 98, location: 'LA', services: 'Nails · Styling · Shave', image: saloonimg2 },
  { name: 'The Gentry', rating: 4.6, reviews: 500, location: 'LA', services: 'Beard Trim · Tips · Shave', image: saloonimg3 },
  { name: 'Zenith', rating: 4.6, reviews: 100, location: 'Manel', services: 'Massage · Pedals', image: saloonimg4 },
  { name: 'Zenith 2', rating: 4.6, reviews: 100, location: 'Manel', services: 'Massage · Pedals', image: saloonimg4 },
  { name: 'Zenith 3', rating: 4.6, reviews: 100, location: 'Manel', services: 'Massage · Pedals', image: saloonimg4 },
];

const FeaturedSalons = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
  <div className='section'>
      <div className="featured-salons-section">
      <h2 className="section-title">FEATURED SALONS</h2>
      <p className="section-subtitle">Discover top-rated salons near you</p>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left-arrow" onClick={scrollLeft}>
          ❮
        </button>
        
        <div className="cards-container" ref={scrollRef}>
          {salonsData.map((salon, index) => (
            <SalonCard key={index} salon={salon} />
          ))}
        </div>

        <button className="carousel-arrow right-arrow" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </div>
  </div>
  );
};

export default FeaturedSalons;
