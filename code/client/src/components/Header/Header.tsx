import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/img/Group%2017.svg" alt="Movizz" className="header-logo" />
          </Link>
          <nav className="main-nav">
            <Link to="/films-az" className="nav-link">A à Z</Link>
            <Link to="/films-recents" className="nav-link">Dernières sorties</Link>
            <Link to="/films-compact" className="nav-link">Vue compact</Link>
          </nav>
        </div>

        <div className="header-right">
          <div className="search-container">
            <input 
              type="search" 
              placeholder="Rechercher un film..."
              className="search-input"
            />
            <button className="search-button" aria-label="Rechercher">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <button className="login-button">Connexion</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
