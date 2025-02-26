import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo">
      <img src="img/Group%2017.svg" alt="Movizz" className="logo-image" />
    </Link>
  );
};

export default Logo;
