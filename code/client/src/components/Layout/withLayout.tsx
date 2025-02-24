import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export const withLayout = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <div className="page">
      <Header />
      <main className="main-content">
        <Component {...props} />
      </main>
      <Footer />
    </div>
  );
};
