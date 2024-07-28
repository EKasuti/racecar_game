import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 
import landingPageImage from "../images/landing_image.png";

const LandingPage = () => {
  return (
    <div className="landing-page" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navbar */}
      <nav className="navbar" style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className="logo">Daly</div>
        <Link to="/login" className="login-button">Login</Link>
      </nav>

      {/* Main content */}
      <main className="main-content" style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Left side content */}
        <div className="content-left" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '2rem',
        }}>
          <h1 style={{ marginBottom: '2rem', fontSize:'3rem' }}>Welcome to Daly</h1>
          <p style={{ marginBottom: '2rem', fontSize:'2rem'}}>Experience the thrill of racing in our cutting-edge game. Are you ready to take on the challenge?</p>
          <Link to="/login" className="cta-button" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}>Start Racing</Link>
        </div>

        {/* Right side image */}
        <div className="content-right" style={{
          flex: 1,
          position: 'relative',
        }}>
          <img 
            src={landingPageImage} 
            alt="Landing page" 
            className="landing-image" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: -10,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;