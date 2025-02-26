import React from 'react';
import Hero from '../../components/Hero/Hero';
import PopularMovies from '../../components/PopularMovies/PopularMovies';
import './Home.css';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="content-container">
        <PopularMovies />
      </div>
    </>
  );
};

export default Home;
