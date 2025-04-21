import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import noImageFound from "../../assets/img/NoImageFound.png"; // Image de remplacement

interface Movie {
	movie_id: number;
	title: string;
	poster_url: string;
	genders: { gender_id: number; gender_name: string }[]; // Liste des genres
}

const Home: React.FC = () => {
	const navigate = useNavigate();
	const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
		{},
	);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // État pour le pop-up
	const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
	const [error, setError] = useState<string | null>(null); // Gestion des erreurs
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Simule l'état de connexion
	const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false); // État pour afficher le pop-up d'authentification

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

	// Fonction pour ouvrir le pop-up
	const openPopup = (movie: Movie) => {
		if (!isAuthenticated) {
			setShowAuthPopup(true); // Affiche le pop-up d'authentification
			return;
		}
		setSelectedMovie(movie); // Affiche le pop-up du film si l'utilisateur est connecté
	};

	// Fonction pour fermer le pop-up
	const closePopup = () => {
		setSelectedMovie(null);
	};

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
			</header>
			<section className="home-preview">
				{Object.entries(moviesByGenre).map(([genre, movies]) => (
					<div key={genre} className="genre-section">
						<h3>{genre}</h3>
						<div className="movies-row">
							{movies.map((movie) => (
								<div
									key={movie.movie_id}
									className="movie-card"
									onClick={() => openPopup(movie)}
								>
									<img
										src={`${import.meta.env.VITE_API_URL}/img/${movie.poster_url}`}
										alt={movie.title}
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = noImageFound; // Image de remplacement
										}}
									/>
									<p>{movie.title}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</section>

			{/* Pop-up pour afficher les détails du film */}
			{selectedMovie && (
				<div className="popup-overlay" onClick={closePopup}>
					<div className="popup-content" onClick={(e) => e.stopPropagation()}>
						<button className="close-button" onClick={closePopup}>
							&times;
						</button>
						<h2>{selectedMovie.title}</h2>
						<img
							src={`${import.meta.env.VITE_API_URL}/img/${selectedMovie.poster_url}`}
							alt={selectedMovie.title}
							className="popup-poster"
						/>
						<p>
							<strong>Genres :</strong>{" "}
							{selectedMovie.genders
								.map((gender) => gender.gender_name)
								.join(", ")}
						</p>
					</div>
				</div>
			)}

			{/* Pop-up d'authentification */}
			{showAuthPopup && (
				<div className="popup-overlay" onClick={() => setShowAuthPopup(false)}>
					<div className="popup-content" onClick={(e) => e.stopPropagation()}>
						<button
							className="close-button"
							onClick={() => setShowAuthPopup(false)}
						>
							&times;
						</button>
						<h2>Connectez-vous ou inscrivez-vous</h2>
						<p>Vous devez être connecté pour accéder à la fiche du film.</p>
						<div className="auth-actions">
							<button
								type="button"
								className="auth-button"
								onClick={() => navigate("/login")}
							>
								Se connecter
							</button>
							<button
								type="button"
								className="auth-button"
								onClick={() => navigate("/register")}
							>
								S'inscrire
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
