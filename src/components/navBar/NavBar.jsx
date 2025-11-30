import React from "react";
import "./navBar.css";

const navItems = ["Home", "Salons", "About", "Contact"];

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="glass-nav-bar shadow-sm">

        {/* اليسار - اسم المحل */}
        <div className="brand-name">SALON</div>

        {/* المنتصف - الروابط */}
        <div className="nav-center">
          {navItems.map((item, index) => (
            <a key={index} href={`${item.toLowerCase()}`} className="nav-item">
              {item}
            </a>
          ))}
        </div>

        {/* اليمين - الأزرار */}
        <div className="nav-buttons">
          <button className="nav-btn">Register</button>
          <button className="nav-btn login-btn">Login</button>
        </div>

      </nav>
    </div>
  );
};

export default NavBar;
