import React from 'react';
import './App.css';

function App() {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">StartupIdeaExchange</div>
        <nav>
          <button className="nav-btn">Login</button>
          <button className="cta-btn">Get Started</button>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Launch Your Startup <span className="highlight">Today</span></h1>
          <p className="subtitle">
            The all-in-one marketplace for founders. Buy templates, tools, and services to go from idea to exit.
          </p>
          <div className="button-group">
            <button className="primary-btn">Explore Marketplace</button>
            <button className="secondary-btn">Sell Your Services</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Curated Tools</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Expert Support</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
