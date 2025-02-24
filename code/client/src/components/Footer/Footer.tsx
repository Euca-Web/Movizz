import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="welcome-text">
          Bienvenue sur Movizz, votre bibliothèque en ligne dédiée aux films récents et 
          classiques. Explorez une vaste collection d'œuvres cinématographiques, 
          soigneusement classées et accessibles gratuitement.
        </p>
        
        <div className="footer-links">
          <a href="/conditions">Conditions d'utilisation</a>
          <a href="/mentions-legales">Mentions Légales</a>
          <a href="/contact">Nous contacter</a>
        </div>

        <div className="footer-logo">
          <span className="logo-text">M<span className="logo-icon">⏵</span>VIZZ</span>
          <p className="copyright">Powered by React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
