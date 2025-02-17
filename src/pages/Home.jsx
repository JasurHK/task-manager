import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Task Manager 🚀</h1>
        <p>Organize your tasks, boost your productivity, and stay on track.</p>
        <Link to="/board" className="cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;