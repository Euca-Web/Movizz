import React, { useState } from 'react';
import './CompactView.css';
import { Movie } from '../../types/movie';

const CompactView: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'year'>('rating');

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === 'rating') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return parseInt(b.year) - parseInt(a.year);
  });

  return (
    <div className="compact-view">
      <div className="view-header">
        <h1>Vue compacte des films</h1>
        <div className="sort-controls">
          <button 
            className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`}
            onClick={() => setSortBy('rating')}
          >
            Trier par note
          </button>
          <button 
            className={`sort-button ${sortBy === 'year' ? 'active' : ''}`}
            onClick={() => setSortBy('year')}
          >
            Trier par année
          </button>
        </div>
      </div>

      <div className="compact-grid">
        {sortedMovies.map((movie) => (
          <div key={movie.id} className="compact-card">
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="compact-info">
              <h3>{movie.title}</h3>
              <div className="compact-meta">
                <span className="year">{movie.year}</span>
                <span className="rating">{movie.rating}/10</span>
              </div>
              <p className="duration">{movie.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompactView;
