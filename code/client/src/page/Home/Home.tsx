import type React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import noImageFound from "../../assets/img/NoImageFound.png"; // Image de remplacement

interface Movie {
	movie_id: number;
	title: string;
	poster_url: string;
	genders: { gender_id: number; gender_name: string }[]; // Liste des genres
}

const Home: React.FC = () => {
	const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
		{},
	);
	const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
	const [error, setError] = useState<string | null>(null); // Gestion des erreurs

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`);
				if (!response.ok) {
					throw new Error(`Erreur HTTP : ${response.status}`);
				}
				const data = await response.json();
				console.log("Données brutes reçues de l'API :", data);

				// Vérifiez si les données sont un tableau ou un objet contenant les films
				const movies = Array.isArray(data.data) ? data.data : [];
				console.log("Films après extraction :", movies);

				if (!Array.isArray(movies)) {
					throw new Error("Les données reçues ne sont pas un tableau.");
				}

				// Utiliser un Set pour éviter les doublons
				const displayedMovies = new Set<number>();
				const groupedMovies = movies.reduce<Record<string, Movie[]>>(
					(acc, movie) => {
						if (
							movie.genders &&
							Array.isArray(movie.genders) &&
							movie.genders.length > 0
						) {
							for (const gender of movie.genders) {
								if (!displayedMovies.has(movie.movie_id)) {
									if (!acc[gender.gender_name]) {
										acc[gender.gender_name] = [];
									}
									acc[gender.gender_name].push(movie);
									displayedMovies.add(movie.movie_id); // Marquer le film comme affiché
								}
							}
						} else {
							console.warn(
								`Le film "${movie.title}" n'a pas de genres valides.`,
							);
						}
						return acc;
					},
					{},
				);

				console.log("Films groupés par genre :", groupedMovies);
				setMoviesByGenre(groupedMovies);
			} catch (err) {
				setError("Erreur lors de la récupération des films.");
				console.error("Erreur :", err);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (loading) {
		return <div className="loading">Chargement des films...</div>;
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return (
		<div className="home-page">
			<header
				className="home-header"
				style={{ animation: "fadeIn 1s ease-in-out" }}
			>
				<h1>Bienvenue sur MOVIZZ</h1>
				<p>Explorez une vaste collection de films et découvrez vos favoris.</p>
				<p>Créez votre compte afin d'accéder aux pages des films ! </p>
			</header>
			<section className="home-preview">
				{Object.entries(moviesByGenre).map(([genre, movies]) => (
					<div key={genre} className="genre-section">
						<h3>{genre}</h3>
						<div className="movies-row">
							{movies.map((movie) => (
								<div key={movie.movie_id} className="movie-card">
									<img
										src={`${import.meta.env.VITE_API_URL}/img/${movie.poster_url}`}
										alt={movie.title}
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = noImageFound; // Image de remplacement
										}}
									/>
									<div className="movie-title-overlay">
										<p>{movie.title}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default Home;
