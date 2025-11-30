import React from 'react';
import './footer.css';

const footerLinks = [
  {
    title: 'About Salon',
    links: ['Careers', 'Support', 'Blog', 'Sitemap'],
  },
  {
    title: 'For Business',
    links: ['For Partners', 'Pricing', 'Help Center', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'User Terms'],
  },
];

const socialLinks = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        {/* Logo & App Buttons */}
        <div className="footer-brand">
          <h3 className="footer-logo">Salon</h3>
          <div className="store-buttons">
            <button className="store-btn"> App Store</button>
            <button className="store-btn">▶ Play Store</button>
          </div>
        </div>

        {/* Links Columns */}
        {footerLinks.map((col, i) => (
          <div key={i} className="footer-column">
            <h4 className="col-title">{col.title}</h4>
            <ul>
              {col.links.map((l, x) => (
                <li key={x}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Media */}
        <div className="footer-column">
          <h4 className="col-title">Follow Us</h4>
          <ul>
            {socialLinks.map((name, i) => (
              <li key={i}>
                <a href="#">{name}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>🌐 English</p>
        <p className='copyRight'>© 2025 Salon App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
