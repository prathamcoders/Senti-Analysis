// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const Navbar = () => {
  const handleClick = () => {
    
  }
  return (
    <nav className="navbar">
      <img src={require('./senti-logo.jpg')} alt='Logo' />
      <h1>Senti-Analyzer</h1>
      <div className='links'>
      <Link to="/" id='home' onClick={handleClick}>Home</Link>
      <Link to="/FindSentiment" id='sentiment'>Sentiment</Link>
      <Link id='visualize' to="/Visualize">Visualize</Link>
      <Link id='about' to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
