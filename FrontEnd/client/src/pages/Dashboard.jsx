import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Chatbot from "../components/ChatbotComponent";
import NavigationBar from "../pages/NavigationBar";
import "../styles/Dashboard.css";
import dashboardBackground from "../assets/dashboard_background.jpg";

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard",
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token, navigate]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="dashboard-main">
      <br></br>
      <h1>
        <p> {data.msg}! </p>
      </h1>
      <p>
        <>
          <h1 style={{ textAlign: "center", fontSize: "32px", color: "black" }}>
            🌟 Welcome to HealthBot - Your Personal Health Assistant! 🌟
          </h1>
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            At HealthBot, we're dedicated to revolutionizing the way you manage
            your health. Our mission is to provide you with personalized and
            reliable medical assistance right at your fingertips.
          </p>

          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#333" }}>
              🩺 What is HealthBot? 🤖
            </h2>
            <p style={{ fontSize: "18px" }}>
              HealthBot is an innovative health-related chatbot inspired by
              cutting-edge technology . Designed to be your virtual health
              companion, HealthBot empowers you to take control of your
              well-being with ease and convenience.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#333" }}>
              💡 What can HealthBot do for you? 💬
            </h2>
            <ul
              style={{
                fontSize: "18px",
                listStyleType: "none",
                padding: "20px",
              }}
            >
              <li>
                Personalized Medical Advice: Receive instant medical suggestions
                tailored to your needs based on your input. Whether you have a
                question about symptoms, treatments, or general health advice,
                HealthBot has you covered.
              </li>
              <li>
                Condition Assessment: Worried about your health? HealthBot can
                assess your condition and provide guidance on the next steps to
                take, giving you peace of mind and clarity.
              </li>
              <li>
                Doctor Recommendations: Need to see a doctor? HealthBot can
                recommend suitable healthcare professionals in your area, making
                it easy for you to find the right expert for your needs.
              </li>
              <li>
                Appointment Booking: Say goodbye to long waits and tedious phone
                calls. HealthBot can facilitate the booking of appointments
                directly through the websites of hospitals and clinics, saving
                you time and hassle.
              </li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#333" }}>
              🚀 Our Vision 🌈
            </h2>
            <p style={{ fontSize: "18px" }}>
              At HealthBot, we're committed to enhancing your healthcare
              experience, streamlining the appointment booking process, and
              providing valuable insights to healthcare providers. With
              HealthBot by your side, you can navigate your health journey with
              confidence and convenience.
            </p>
          </div>
        </>
      </p>
      <p></p>
      <Chatbot message={data.msg} /> {/* Render Chatbot component */}
      <Link to="/logout" className="logout-button">
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
