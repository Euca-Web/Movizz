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
						}) => ({
							movie_id: movie.movie_id,
							title: movie.title,
							poster_url: movie.poster_url,
							release_date: movie.release_date,
							duration: movie.duration,
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
					<div key={item.movie_id} className="movie-card">
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
		</div>
	);
};

export default MoviesAZ;
