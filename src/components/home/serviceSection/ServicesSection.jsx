// import React from 'react';
// import './servicesSection.css';
// import imgBgService from '../../../assets/servicesBg2.png';
// import { FaCut } from 'react-icons/fa';
// import { GiSoap, GiHairStrands, GiMeditation } from 'react-icons/gi';

// const services = [
//   { name: "MEN'S HAIRCUTS & BEARD TRIMS", color: '#88aaff', icon: <FaCut /> },
//   { name: 'LUXURY SHAVES & FACIALS', color: '#b8ffc5', icon: <GiSoap /> },
//   { name: "WOMEN'S CUTS & COLOR", color: '#ffd6e7', icon: <GiHairStrands /> },
//   { name: 'SPA & WELLNESS TREATMENTS', color: '#dcd1ff', icon: <GiMeditation /> },
// ];

// const ServicesSection = () => {
//   return (
//     <div className='section'>
//       <div className="services-container">
//       <img src={imgBgService} alt="Services Background" className="background-image" />
//       <div className="overlay"></div>

//       <div className="content-overlay">
//         <h2 className="signature-title">OUR SIGNATURE SERVICES</h2>
//         <span className="scissors-icon"><FaCut /></span>

//         <div className="buttons-grid">
//           {services.map((service, index) => (
//             <button 
//               key={index}
//               className="service-button"
//               style={{ backgroundColor: service.color }}
//             >
//               <span className="button-icon">{service.icon}</span>
//               <span>{service.name}</span>
//             </button>
//           ))}
//         </div>

//         <button className="view-all-button">VIEW ALL SERVICES</button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ServicesSection;


import './servicesSection.css'
import React from 'react';
import './ServicesSection.css'; // استيراد ملف CSS

import { FaCut, FaSpa, FaUserTie, FaFemale, FaSmile } from "react-icons/fa";

const servicesData = [
    { id: 1, title: "Men's Haircuts & Styling", icon: <FaCut /> },
    { id: 2, title: "Luxury Shaves & Beard Trims", icon: <FaUserTie /> },
    { id: 3, title: "Hot Towel Shaves", icon: <FaSpa /> },
    { id: 4, title: "Women's Cuts & Color", icon: <FaFemale /> },
    { id: 5, title: "Facials & Skincare", icon: <FaSmile /> },
    { id: 6, title: "Spa & Wellness Treatments", icon: <FaSpa /> },
    { id: 1, title: "Men's Haircuts & Styling", icon: <FaCut /> },
    { id: 2, title: "Luxury Shaves & Beard Trims", icon: <FaUserTie /> },
];

const ServicesSection = () => {
  return (
 
     <div className="services-container">
      <h2 className="services-header">OUR SIGNATURE SERVICES</h2>
      <div className="cards-grid">
        {servicesData.map(service => (
          <div key={service.id} className="service-card">
            <div className="card-icon">{service.icon}</div>
            <p className="card-title">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
 
  );
};

export default ServicesSection;