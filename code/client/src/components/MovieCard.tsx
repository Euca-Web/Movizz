import type React from "react";
import { formatDate } from "../utils/dateFormatter";
import "../assets/css/MovieCard.css";

interface MovieCardProps {
	id: number;
	posterUrl: string;
	description: string;
	formattedDuration: string;
	title: string;
	poster_url: string;
	rating?: number;
	type: "movie";
}

const MovieCard: React.FC<MovieCardProps> = ({
	id,
	title,
	posterUrl,
	description,
	formattedDuration,
	rating,
	type,
}) => {
	return (
		<div className="movie-card">
			<div className="movie-type">{type}</div>
			{rating && <div className="movie-rating">{rating.toFixed(1)}</div>}
			<div className="movie-type">{type}</div>
			{rating !== undefined && (
				<div className="movie-rating">{rating.toFixed(1)}</div>
			)}
			<img
				src={posterUrl}
				alt={`Affiche du film ${title}`}
				className="movie-poster"
				loading="lazy"
			/>
			<div className="movie-overlay">
				<span>{formatDate(new Date().toISOString())}</span>
				<span>{formattedDuration}</span>
				<span>•</span>
				<p className="movie-description">{description}</p>
			</div>
			<button
				className="movie-button primary"
				type="button"
				onClick={() => handleWatch(id)}
			>
				Regarder
			</button>
			<button
				className="movie-button secondary"
				type="button"
				onClick={() => handleAddToFavorites(id)}
			>
				+ Favoris
			</button>
		</div>
	);
};

const handleWatch = (id: number) => {
	console.log(`Watch movie with ID: ${id}`);
};

const handleAddToFavorites = (id: number) => {
	console.log(`Add movie with ID: ${id} to favorites`);
};

export default MovieCard;
