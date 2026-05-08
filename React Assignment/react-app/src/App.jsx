import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaBars,
} from "react-icons/fa";

const App = () => {
  return (
    <div className="main-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="dot"></span>
          COMPANYNAME
        </div>

        <ul className="nav-links">
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>SHOP</li>
          <li>LOGIN</li>
          <li>
            <FaBars />
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        {/* Left Side */}
        <div className="left-content">

          <div className="circle-bg">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
              alt="shopping"
            />
          </div>

          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
          <div className="shape shape5"></div>

        </div>

        {/* Right Side */}
        <div className="right-content">

          <h3>SPECIAL OFFER</h3>

          <h1>
            MEGA <br />
            <span>SALE</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed diam nonummy nibh euismod tincidunt.
          </p>

          <button>SHOP NOW</button>

          <div className="social-icons">
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
          </div>

          <small>www.sampletext.com</small>

        </div>

      </section>
    </div>
  );
};

export default App;