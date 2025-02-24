import React from 'react';
import { formatDate, formatDuration } from '../../utils/dateFormatter';
import '../../styles/MovieCard.css';

interface MovieCardProps {
    id: number;
    title: string;
    posterUrl: string;
    releaseDate: string;
    duration: number;
    description: string;
    onWatch?: (id: number) => void;
    onAddToFavorites?: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    posterUrl,
    releaseDate,
    duration,
    description,
    onWatch,
    onAddToFavorites
}) => {
    const formattedDate = formatDate(releaseDate);
    const formattedDuration = formatDuration(duration);

    return (
        <div className="movie-card">
            <img 
                src={posterUrl} 
                alt={`Affiche du film ${title}`} 
                className="movie-poster"
                loading="lazy"
            />
            
            <div className="movie-overlay">
                <h3 className="movie-title">{title}</h3>
                
                <div className="movie-info">
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{formattedDuration}</span>
                </div>
                
                <p className="movie-description">{description}</p>
                
                <div className="movie-actions">
                    <button 
                        className="movie-button primary"
                        onClick={() => onWatch?.(id)}
                    >
                        Regarder
                    </button>
                    
                    <button 
                        className="movie-button secondary"
                        onClick={() => onAddToFavorites?.(id)}
                    >
                        + Favoris
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
