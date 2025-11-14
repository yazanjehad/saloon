import React from "react";
import "./SocialAuthButton.css";

function SocialAuthButton({ text, icon }) {
  return (
    <button className="socialAuthBtn">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </button>
  );
}

export default SocialAuthButton;
