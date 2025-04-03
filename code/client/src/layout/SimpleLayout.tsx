import type React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../component/common/Footer';
import BackButton from '../component/common/BackButton';
import '../assets/css/SimpleLayout.css';

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
