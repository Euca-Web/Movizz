import React, { useState } from 'react';
import './RecentMovies.css';
import { Movie } from '../../types/movie';

const RecentMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <div className="recent-movies">
      <h1>Films sortis récemment</h1>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-poster">
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movie-release-date">
                Sorti le {new Date(movie.releaseDate).toLocaleDateString()}
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="movie-meta">
                <span>{movie.duration}</span>
                <span>{movie.rating}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMovies;
