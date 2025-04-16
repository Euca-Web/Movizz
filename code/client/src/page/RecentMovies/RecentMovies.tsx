import type React from "react";
import { useState, useEffect } from "react";
import "./RecentMovies.css"; // Adjust the path as necessary
import noImageFound from "../../assets/img/NoImageFound.png"; // Importez l'image de remplacement

interface Movie {
	movie_id: number;
	title: string;
	release_date: string;
	duration: string; // Durée en minutes (exemple : "120")
	poster_url: string;
}

// Fonction pour convertir la durée en heures et minutes
const formatDuration = (duration: string): string => {
	const totalMinutes = Number.parseInt(duration, 10);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${hours}h ${minutes}min`;
};

const RecentMovies: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const fetchRecentMovies = async () => {
			try {
				const response = await fetch("http://localhost:3000/movie"); // Remplacez par l'URL de votre API
				const data = await response.json();

				if (data && Array.isArray(data.data)) {
					// Trier les films par date de sortie décroissante et prendre les 5 premiers
					const sortedMovies = data.data
						.sort(
							(a: Movie, b: Movie) =>
								new Date(b.release_date).getTime() -
								new Date(a.release_date).getTime(),
						)
						.slice(0, 5);

					setMovies(sortedMovies);
				} else {
					console.error("Invalid data format:", data);
				}
			} catch (error) {
				console.error("Error fetching recent movies:", error);
			}
		};

		fetchRecentMovies();
	}, []);

	return (
		<div className="recent-movies">
			<h1>Derniers films ajoutés</h1>

			<div className="content-grid-recent">
				{movies.map((movie) => (
					<div key={movie.movie_id} className="movie-card">
						{movie.poster_url ? (
							<img
								src={`${import.meta.env.VITE_API_URL}/img/${movie.poster_url}`}
								alt={movie.title.replace(/[^a-zA-Z0-9 ]/g, "").trim()}
								className="content-poster"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									if (target.src !== noImageFound) {
										target.src = noImageFound; // Utilisez l'image importée comme fallback
									}
								}}
							/>
						) : (
							<div className="no-image-placeholder">
								<p>Image non disponible</p>
							</div>
						)}
						<div className="movie-info">
							<h3>{movie.title}</h3>
							<div className="movie-meta">
								<span>
									Sorti le {new Date(movie.release_date).toLocaleDateString()}
								</span>
								<span>{formatDuration(movie.duration)}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentMovies;
