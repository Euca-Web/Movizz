import type React from 'react';
import { useEffect } from 'react';
import '../../styles/MoviesGrid.css';

const MoviesPage: React.FC = () => {
    const { movies, loading, error, getPopularMovies, loadMore } = useMovies();

    useEffect(() => {
        getPopularMovies();
    }, [getPopularMovies]);

    if (error) {
        return <div className="error-message">Une erreur est survenue : {error.message}</div>;
    }

    return (
        <div className="movies-content">
            <h1 className="page-title">Films de A à Z</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img 
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="movie-poster"
                            loading="lazy"
                        />
                        <div className="movie-title">{movie.title}</div>
                    </div>
                ))}
            </div>
            {loading && <div className="loading">Chargement...</div>}
            <button 
                onClick={() => loadMore()} 
                className="load-more-button"
                disabled={loading}
            >
                Charger plus de films
            </button>
        </div>
    );
};

export default withLayout(MoviesPage);
