import { useState } from "react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "./InputField.css";

function InputField({ label, type, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const getIcon = () => {
    if (type === "password") return <FaLock />;
    if (type === "email") return <FaEnvelope />;
    return null;
  };

  return (
    <div className="inputField">
      {label && <label className="inputLabel">{label}</label>}
      <div className="inputWrapper">
        {/* نخفي الأيقونة إذا المستخدم بدأ يكتب */}
        {getIcon() && !value && <span className="inputIcon">{getIcon()}</span>}
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <span className="passwordToggle" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}


export default InputField;
