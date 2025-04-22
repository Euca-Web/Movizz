import type React from "react";
import { useState, useEffect } from "react";
import "./MoviesAZ.css";
import noImageFound from "../../assets/img/NoImageFound.png"; // Importez l'image de remplacement

interface ContentItem {
	movie_id: number;
	title: string;
	poster_url: string;
	release_date: string; // Ajout de la date de sortie
	duration: string; // Ajout de la durée en minutes
	type: "movie";
	trailer_url?: string; // URL de la bande-annonce
	director?: string; // Réalisateur
	summary?: string; // Résumé
	genres?: string[]; // Liste des genres
}

// Fonction pour convertir la durée en heures et minutes
const formatDuration = (duration: string): string => {
	const totalMinutes = Number.parseInt(duration, 10);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${hours}h ${minutes}min`;
};

const MoviesAZ: React.FC = () => {
	const [content, setContent] = useState<ContentItem[]>([]);
	const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<ContentItem | null>(null); // État pour le pop-up
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const [selectedLetter, setSelectedLetter] = useState<string>("");

	useEffect(() => {
		const fetchContent = async () => {
			try {
				console.log("Fetching movies...");
				const moviesResponse = await fetch("http://localhost:3000/movie");

				const moviesData = await moviesResponse.json();

				// Combine and sort all content
				const allContent = [
					...(moviesData.data || []).map(
						(movie: {
							movie_id: number;
							title: string;
							poster_url: string;
							release_date: string;
							duration: string;
							trailer_url?: string;
							director?: string;
							summary?: string;
							genres?: string[];
						}) => ({
							movie_id: movie.movie_id,
							title: movie.title,
							poster_url: movie.poster_url,
							release_date: movie.release_date,
							duration: movie.duration,
							trailer_url: movie.trailer_url,
							director: movie.director,
							summary: movie.summary,
							genres: movie.genres,
							type: "movie",
						}),
					),
				].sort((a, b) =>
					a.title.localeCompare(b.title, "fr", { sensitivity: "base" }),
				);

				setContent(allContent);
				setFilteredContent(allContent);
			} catch (error) {
				console.error("Error fetching content:", error);
			}
			return;
		};

		fetchContent();
	}, []);

	useEffect(() => {
		if (selectedLetter) {
			const filtered = content.filter(
				(item) =>
					item.title
						.normalize("NFD")
						.replace(/\p{M}/gu, "") // Remove accents
						.charAt(0)
						.toUpperCase() === selectedLetter,
			);
			setFilteredContent(filtered);
		} else {
			setFilteredContent(content);
		}
	}, [selectedLetter, content]);

	// Fonction pour ouvrir le pop-up
	const openPopup = (movie: ContentItem) => {
		setSelectedMovie(movie);
	};

	// Fonction pour fermer le pop-up
	const closePopup = () => {
		setSelectedMovie(null);
	};

	return (
		<div className="movies-az">
			<h1>Films de A à Z</h1>

			<div className="alphabet-filter">
				<button
					type="button"
					className={`letter-button ${selectedLetter === "" ? "active" : ""}`}
					onClick={() => setSelectedLetter("")}
				>
					Tous
				</button>
				{alphabet.map((letter) => (
					<button
						type="button"
						key={letter}
						className={`letter-button ${selectedLetter === letter ? "active" : ""}`}
						onClick={() => setSelectedLetter(letter)}
					>
						{letter}
					</button>
				))}
			</div>

			<div className="content-grid">
				{filteredContent.map((item) => (
					<div
						key={item.movie_id}
						className="movie-card"
						onClick={() => openPopup(item)} // Ouvre le pop-up au clic
						onKeyUp={(e) => {
							if (e.key === "Enter" || e.key === " ") openPopup(item);
						}}
					>
						{item.poster_url ? (
							<img
								src={`${import.meta.env.VITE_API_URL}/img/${item.poster_url}`}
								alt={item.title.replace(/[^a-zA-Z0-9 ]/g, "").trim()}
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
							<h3>{item.title}</h3>
							<div className="movie-meta">
								<span>
									Sorti le {new Date(item.release_date).toLocaleDateString()}
								</span>
								<span>{formatDuration(item.duration)}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pop-up pour afficher les détails du film */}
			{selectedMovie && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div className="popup-overlay" onClick={closePopup}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div className="popup-content" onClick={(e) => e.stopPropagation()}>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="close-button" onClick={closePopup}>
							&times;
						</button>
						<h2>{selectedMovie.title}</h2>
						<div className="popup-main-content">
							<img
								src={
									selectedMovie.poster_url
										? `${import.meta.env.VITE_API_URL}/img/${selectedMovie.poster_url}`
										: noImageFound
								}
								alt={selectedMovie.title}
								className="popup-poster"
							/>
							<div className="popup-right">
								{selectedMovie.trailer_url && (
									<div className="popup-trailer">
										<strong>Bande-annonce :</strong>
										<iframe
											width="100%"
											height="315"
											src={selectedMovie.trailer_url}
											title={`Bande-annonce de ${selectedMovie.title}`}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										/>
									</div>
								)}
								<div className="popup-details">
									<p>
										<strong>Date de sortie :</strong>{" "}
										{new Date(selectedMovie.release_date).toLocaleDateString()}
									</p>
									<p>
										<strong>Durée :</strong> {formatDuration(selectedMovie.duration)}
									</p>
									{selectedMovie.director && (
										<p>
											<strong>Réalisateur :</strong> {selectedMovie.director}
										</p>
									)}
									{selectedMovie.genres && selectedMovie.genres.length > 0 && (
										<p>
											<strong>Genres :</strong> {selectedMovie.genres.join(", ")}
										</p>
									)}
									{selectedMovie.summary && (
										<p>
											<strong>Résumé :</strong> {selectedMovie.summary}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MoviesAZ;
