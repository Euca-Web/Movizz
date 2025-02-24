import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <button className="nav-button">Films de A à Z</button>
      <button className="nav-button">Dernières sorties</button>
      <button className="nav-button">Vue compact</button>
    </nav>
  );
};

export default Navigation;
