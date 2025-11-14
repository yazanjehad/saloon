import LogoWebsite from "../../components/logoWebsite/LogoWebsite";
import "./login.css";
import { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

import loginImg from "../../assets/Login.png";
import InputField from "../../components/inputField/InputField";
import LoginRegisterButton from "../../components/buttons/loginRegisterButton/LoginRegisterButton";
import SocialAuthButton from "../../components/buttons/socialAuthButton/SocialAuthButton";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="appContainer  ">
      <div className="loginContainer ">
        <LogoWebsite />
        <div className="loginImg">
          <img src={loginImg} alt="" />
        </div>
        <div className="inputField">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgetPassword">
            <span>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
            </span>
            <span>Forget password ?</span>
          </div>
        </div>
        <div className="loginBtn">
          <LoginRegisterButton text="Login" />
        </div>
        <div className="loginWith ">
          . . . . . . . . . . . . . . . . or log in with . . . . . . . . . . . .
          .
          <div className="socialAuthButton">
            <SocialAuthButton text="Google" icon={<FaGoogle />} />
            <SocialAuthButton text="Facebook" icon={<FaFacebookF />} />
          </div>
        </div>
        <Link className="signUpNow">
          Don`t have an account ?{" "}
          <span
            className="fw-bold"
          >
            Sign up now
          </span>{" "}
        </Link>
      </div>
    </div>
  );
}

export default Login;
