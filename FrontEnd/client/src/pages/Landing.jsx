import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="landing-main">
      <h1>Welcome to Healthbot </h1>
      <p>Please Login or Register to continue.</p>
      <Link to="/login" className="landing-login-button">
        Login
      </Link>
      <Link to="/register" className="landing-register-button">
        Register
      </Link>
    </div>
  );
};

export default Landing;
