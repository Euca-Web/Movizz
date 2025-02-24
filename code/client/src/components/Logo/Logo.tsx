import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo">
      <img src="/logo.png" alt="Movizz" className="logo-image" />
    </Link>
  );
};

export default Logo;
