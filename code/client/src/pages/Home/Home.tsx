import React from 'react';
import Header from '../../components/Header/Header';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import Navigation from '../../components/Navigation/Navigation';
import PopularMovies from '../../components/PopularMovies/PopularMovies';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <main>
        <MovieCarousel />
        <Navigation />
        <PopularMovies />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
