import React from "react";
import "./heroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1 className="main-title titleHero">Book Beauty & Care Services Easily</h1>

      <p className="subtitle">
        Discover top-rated salons, wellness centers, and beauty experts nearby, 
        and book your appointment in just seconds.
      </p>

      <div className="search-bar-container">
        {/* Categories */}
        <div className="search-input-group categories">
          <input
            type="text"
            placeholder="All Categories"
            className="search-input"
          />
        </div>

        {/* Location */}
        <div className="search-input-group location">
          <input
            type="text"
            placeholder="Location"
            className="search-input"
          />
        </div> 

        {/* Time */}
        <div className="search-input-group time">
          <input
            type="text"
            placeholder="Any Time"
            className="search-input"
            readOnly
          />
        </div>

        {/* Search Button */}
        <button className="search-button">Search</button>
      </div>
    </section>
  );
};

export default HeroSection;
