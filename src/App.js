// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import Dashboard for sentiment results
import Visualize from './Visualize'; // Import Home for file upload
import Home from './Home';
import Navbar from './Navbar'; // Import your Navbar component
import About from './About';
import Footer from './Footer';
import Sentiment from './Sentiment';
function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FindSentiment" element={<Sentiment />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />}>
          </Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
