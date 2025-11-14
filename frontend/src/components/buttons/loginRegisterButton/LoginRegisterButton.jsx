import React from "react";
import "./LoginRegisterButton.css";

function LoginRegisterButton({ text, onClick }) {
  return (
    <button className="loginRegisterBtn" onClick={onClick}>
      {text}
    </button>
  );
}

export default LoginRegisterButton;
