import React, { useEffect } from "react";
import "../styles/Logout.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  useEffect(() => {
    // Prevent scrolling once the page content ends
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="logout-main">
      <h1>Logout Successful!</h1>
      <p>You will be redirected to the landing page in 3 seconds...</p>
    </div>
  );
};

export default Logout;
