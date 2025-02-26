import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PopularMovies.css';
import '../MovieCard/MovieCard.css';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  year: string;
  duration: string;
  rating: string;
  quality: string;
}

const PopularMovies: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('popular');

  const movies: Movie[] = [
    {
      id: 1,
      title: "Dune : Deuxième partie",
      imageUrl: "https://www.themoviedb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      year: "2024",
      duration: "2h 46min",
      rating: "8.4",
      quality: "HD"
    },
    {
      id: 2,
      title: "Madame Web",
      imageUrl: "https://www.themoviedb.org/t/p/w500/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
      year: "2024",
      duration: "1h 56min",
      rating: "7.2",
      quality: "HD"
    },
    {
      id: 3,
      title: "Migration",
      imageUrl: "https://www.themoviedb.org/t/p/w500/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
      year: "2024",
      duration: "1h 31min",
      rating: "7.5",
      quality: "HD"
    },
    {
      id: 4,
      title: "Poor Things",
      imageUrl: "https://www.themoviedb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      year: "2024",
      duration: "2h 21min",
      rating: "8.1",
      quality: "HD"
    },
    {
      id: 5,
      title: "Argylle",
      imageUrl: "https://www.themoviedb.org/t/p/w500/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg",
      year: "2024",
      duration: "2h 19min",
      rating: "6.1",
      quality: "HD"
    },
    {
      id: 6,
      title: "Wonka",
      imageUrl: "https://www.themoviedb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
      year: "2024",
      duration: "1h 56min",
      rating: "7.2",
      quality: "HD"
    }
  ];

  return (
    <section className="movies-section">
      <div className="category-buttons">
        <Link 
          to="/films-az"
          className="category-button"
        >
          Voir les films de A à Z
        </Link>
        <Link 
          to="/films-recents"
          className="category-button"
        >
          Voir les films sorti dernièrement
        </Link>
        <Link 
          to="/films-compact"
          className="category-button"
        >
          Voir les films en vue compact (meilleurs vu d'ensemble)
        </Link>
      </div>
      
      <div className="movies-slider">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="movie-card"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="movie-poster">
              <img src={movie.imageUrl} alt={movie.title} />
              <div className="movie-quality">{movie.quality}</div>
              {hoveredId === movie.id && (
                <div className="hover-info">
                  <button className="play-button">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="movie-meta">
                <span>{movie.year}</span>
                <span className="separator">•</span>
                <span>{movie.duration}</span>
                <span className="separator">•</span>
                <span className="rating">★ {movie.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularMovies;
