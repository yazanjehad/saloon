// DownloadApp.jsx
import React from 'react';
import './downloadApp.css';
import phoneMockup from '../../../assets/phoneMockup.png'; // صورة الهاتف الحقيقية

const AppMockup = () => (
  <div className="phone-frame">
    <img src={phoneMockup} alt="Phone Mockup" className="phone-image" />
  </div>
);

const DownloadSection = () => (
  <div className="download-content">
    <h1 className="main-heading">Download Our App</h1>
    <p className="subtext">
      Book faster, track appointments, and get exclusive offers anywhere, anytime.
    </p>
    <div className="app-buttons">
      <a href="#" className="app-store-button">
        <span className="icon"></span>
        <span className="text-group">
          <span className="small-text">Download on the</span>
          <span className="large-text">App Store</span>
        </span>
      </a>

      <a href="#" className="google-play-button">
        <span className="icon">▶</span>
        <span className="text-group">
          <span className="small-text">GET IT ON</span>
          <span className="large-text">Google Play</span>
        </span>
      </a>
    </div>
  </div>
);

const DownloadApp = () => (
 <div className='section'>
   <div className="download-page-container ">
    <AppMockup />
    <DownloadSection />
  </div>
 </div>
);

export default DownloadApp;
