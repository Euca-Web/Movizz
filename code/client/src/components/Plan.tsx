import type React from "react";
import { Link } from "react-router-dom";

const Plan: React.FC = () => {
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Plan du site</h1>
			<ul style={{ listStyleType: "none", padding: 0 }}>
				<li>
					<Link to="/">Accueil</Link>
				</li>
				<li>
					<Link to="/films-az">Films de A à Z</Link>
				</li>
				<li>
					<Link to="/films-recents">Dernières sorties</Link>
				</li>
				<li>
					<Link to="/films-compact">Vue compacte</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
				<li>
					<Link to="/mentions-legales">Mentions légales</Link>
				</li>
				<li>
					<Link to="/conditions-utilisation">Conditions d'utilisation</Link>
				</li>
				<li>
					<Link to="/register">Inscription</Link>
				</li>
				<li>
					<Link to="/login">Connexion</Link>
				</li>
			</ul>
		</div>
	);
};

export default Plan;
