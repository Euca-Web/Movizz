import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <img src="../public/img/Group%2017.svg" alt="Movizz" className="nav-logo" />
      <div className="nav-buttons">
        <button className="nav-button">A à Z</button>
        <button className="nav-button">Dernières sorties</button>
        <button className="nav-button">Vue compact</button>
      </div>
    </nav>
  );
};

export default Navigation;
