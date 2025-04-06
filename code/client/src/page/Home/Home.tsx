import type React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ajoute un fichier CSS pour styliser la page

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="home-page">
			<header
				className="home-header"
				style={{ animation: "fadeIn 1s ease-in-out" }}
			>
				<h1>Bienvenue sur MOVIZZ</h1>
				<p>Explorez une vaste collection de films et découvrez vos favoris.</p>
			</header>
			<div className="home-actions">
				<button
					type="button"
					className="home-button"
					onClick={() => navigate("/login")}
				>
					<span>🔑</span> Se connecter
				</button>
				<button
					type="button"
					className="home-button"
					onClick={() => navigate("/register")}
				>
					<span>📝</span> S'inscrire
				</button>
			</div>
			<section className="home-preview">
				<h2>Fonctionnalités principales :</h2>
				<ul>
					<li>🎥 Trier les films par date, durée ou réalisateur</li>
					<li>📖 Accéder à des informations détaillées sur chaque film</li>
					<li>⭐ Créer votre propre liste de favoris</li>
				</ul>
			</section>
		</div>
	);
};

export default Home;
