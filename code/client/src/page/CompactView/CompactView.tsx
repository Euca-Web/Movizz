import type React from "react";
import { useState, useEffect } from "react";
import "./CompactView.css"; // Adjust the path as necessary
import MovieAPI from "../../service/movie_api";

interface Movie {
	movie_id: number;
	title: string;
	release_date: string;
	duration: string;
	poster_url: string;

}

const formatDuration = (duration: string): string => {
	const totalMinutes = Number.parseInt(duration, 10);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${hours}h ${minutes}min`;
};

const CompactView: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isSortedByDate, setIsSortedByDate] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch movies from the database
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const data = await new MovieAPI().SelectAll();
				console.log("Fetched data:", data);

				// Vérifiez si data.data existe et est un tableau
				if (data && Array.isArray(data.data)) {
					setMovies(data.data); // Utilisez data.data au lieu de data.movies
				} else {
					console.error("Invalid data format:", data);
					setMovies([]); // Définit un tableau vide si les données sont invalides
				}
			} catch (error) {
				console.error("Error fetching movies:", error);
				setMovies([]); // Définit un tableau vide en cas d'erreur
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (isLoading) {
		return <div>Chargement des films...</div>;
	}

	// Sort movies by release date
	const sortedMovies = Array.isArray(movies)
		? [...movies].sort((a, b) => {
				return isSortedByDate
					? new Date(b.release_date).getTime() -
							new Date(a.release_date).getTime()
					: new Date(a.release_date).getTime() -
							new Date(b.release_date).getTime();
			})
		: [];

	return (
		<div className="compact-view">
			<div className="view-header">
				<h1>Vue compacte des films</h1>
				<div className="sort-controls">
					<button
						type="button"
						className={`sort-button ${isSortedByDate ? "active" : ""}`}
						onClick={() => setIsSortedByDate(!isSortedByDate)}
					>
						Trier par {isSortedByDate ? "date croissante" : "date décroissante"}
					</button>
				</div>
			</div>

			<ol className="compact-grid">
				{sortedMovies.map((movie, index) => (
					<li key={movie.movie_id} className="compact-card">
						<h3>{`${index + 1}. ${movie.title}`}</h3>
						<p>
							Date de sortie :{" "}
							{new Date(movie.release_date).toLocaleDateString()}
						</p>
						<p>Durée : {formatDuration(movie.duration)}</p>
					</li>
				))}
			</ol>
		</div>
	);
};

export default CompactView;
