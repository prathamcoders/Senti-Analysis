// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css'; // Include your CSS file if applicable

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap your App with Router */}
      <App />
    </Router>
  </React.StrictMode>
);
