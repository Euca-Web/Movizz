import { useEffect, useState } from "react";
import "../assets/css/PopularMovies.css";

const PopularMovies = () => {
	interface movies {
		movie_id: number;
		title: string;
		poster_url: string;
		release_date: string;
		duration: string;
	}

	const [movies, setMovies] = useState<movies[]>([]); // Stocke les films
	const [loading, setLoading] = useState<boolean>(true); // Indique si les données sont en cours de chargement
	const [error, setError] = useState<string | null>(null); // Stocke les erreurs éventuelles

	useEffect(() => {
		// Fonction pour récupérer les films depuis l'API
		const fetchMovies = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`);
				if (!response.ok) {
					console.error("Erreur HTTP :", response.status, response.statusText);
					throw new Error("Erreur lors du chargement des films");
				}
				const data = await response.json();
				console.log("Données reçues :", data);
				setMovies(data);
			} catch (err: unknown) {
				console.error("Erreur attrapée :", err);
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Une erreur inconnue s'est produite");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (loading) {
		return <div>Chargement des films...</div>;
	}

	if (error) {
		return <div>Erreur : {error}</div>;
	}

	return (
		<div className="popular-movies">
			<h1>Films les plus populaires</h1>
			<div className="movies-grid">
				{movies.map((movie) => (
					<div className="movie-card" key={movie.movie_id}>
						<div className="movie-poster">
							<img src={movie.poster_url} alt={movie.title} />
							<div className="movie-release-date">
								Sorti le {movie.release_date}
							</div>
						</div>
						<div className="movie-info">
							<h3>{movie.title}</h3>
							<div className="movie-meta">
								<span>{movie.duration}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularMovies;
