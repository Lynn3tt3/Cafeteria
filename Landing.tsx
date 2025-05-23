import React from "react";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to CUEA Cafeteria</h1>
        <p>Order meals, manage your food balance, and stay healthy on campus</p>
        <div className="landing-buttons">
          <a href="/login" className="btn btn-primary">Login</a>
          <a href="/register" className="btn btn-secondary">Register</a>
        </div>
      </header>
      <section className="landing-about">
        <h2>About Us</h2>
        <p>
          At CUEA Cafeteria, we offer a variety of meals to cater to all tastes. Our commitment is to provide nutritious and affordable meals to our students and staff.
        </p>
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} CUEA Cafeteria. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
