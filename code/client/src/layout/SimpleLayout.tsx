import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import BackButton from '../components/BackButton/BackButton';
import '../styles/layout/SimpleLayout.css';

const SimpleLayout: React.FC = () => {
  return (
    <div className="simple-layout">
      <BackButton />
      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SimpleLayout;
