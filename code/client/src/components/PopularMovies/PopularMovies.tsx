import React from 'react';
import './PopularMovies.css';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
}

const PopularMovies: React.FC = () => {
  const movies: Movie[] = [
    {
      id: 1,
      title: "Joker",
      imageUrl: "/src/assets/movies/joker.jpg"
    },
    {
      id: 2,
      title: "Alien",
      imageUrl: "/src/assets/movies/alien.jpg"
    },
    {
      id: 3,
      title: "Arcane",
      imageUrl: "/src/assets/movies/arcane.jpg"
    }
  ];

  return (
    <section className="popular-movies">
      <h2>Populaires :</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="movie-overlay">
              <h3>{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularMovies;
