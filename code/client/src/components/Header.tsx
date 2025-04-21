import type React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/css/common/Header.css"; // Adjust the path as necessary
import logo from "../assets/svg/logo.svg";
import { UserContext } from "../provider/UserProvider"; // Adjust the path as necessary

interface User {
	role_id: number;
	// Add other properties of the user object if necessary
}

const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const { user } = useContext(UserContext) as { user: User };

	return (
		<header className={`header ${isScrolled ? "scrolled" : ""}`}>
			<div className="header-content">
				<div className="header-left">
					<Link to="/" className="logo">
						<img src={logo} alt="Movizz" className="header-logo" />
					</Link>
				</div>

				{/* Bouton Burger */}
				<div
					className="burger-menu"
					onClick={() => {
						console.log("Menu clicked"); // Vérifie si le clic est détecté
						setIsMenuOpen(!isMenuOpen);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							console.log("Menu activated via keyboard"); // Vérifie si le clavier est détecté
							setIsMenuOpen(!isMenuOpen);
						}
					}}
					aria-label="Menu"
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				{/* Menu déroulant */}
				{isMenuOpen && (
					<div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
						{user.role_id && (
							<>
								<Link
									to="/films-az"
									className="nav-link"
									onClick={() => setIsMenuOpen(false)}
								>
									A à Z
								</Link>
								<Link
									to="/films-recents"
									className="nav-link"
									onClick={() => setIsMenuOpen(false)}
								>
									Dernières sorties
								</Link>
								<Link
									to="/films-compact"
									className="nav-link"
									onClick={() => setIsMenuOpen(false)}
								>
									Vue compact
								</Link>
							</>
						)}
						{user.role_id === 2 && (
							<Link
								to="/admin"
								className="nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Administration
							</Link>
						)}
						{user.role_id ? (
							<Link
								to="/logout"
								className="nav-link"
								onClick={() => setIsMenuOpen(false)}
							>
								Déconnexion
							</Link>
						) : (
							<>
								<Link
									to="/register"
									className="nav-link"
									onClick={() => setIsMenuOpen(false)}
								>
									Inscription
								</Link>
								<Link
									to="/login"
									className="nav-link"
									onClick={() => setIsMenuOpen(false)}
								>
									Connexion
								</Link>
							</>
						)}
					</div>
				)}

				{/* Barre de recherche
				<div className="search-container">
					<input
						type="search"
						placeholder="Rechercher un film..."
						className="search-input"
					/>
					 <button className="search-button" type="button" aria-label="Rechercher">
						 🔍
					</button>
				</div> */}

				{/* Navigation principale (desktop) */}
				<nav className="main-nav">
					{user.role_id && (
						<>
							<Link to="/films-az" className="nav-link">
								A à Z
							</Link>
							<Link to="/films-recents" className="nav-link">
								Dernières sorties
							</Link>
							<Link to="/films-compact" className="nav-link">
								Vue compact
							</Link>
						</>
					)}
					{user.role_id === 2 && (
						<Link to="/admin" className="nav-link">
							Administration
						</Link>
					)}
					{user.role_id ? (
						<Link to="/logout" className="nav-link">
							Déconnexion
						</Link>
					) : (
						<>
							<Link to="/register" className="nav-link">
								Inscription
							</Link>
							<Link to="/login" className="nav-link">
								Connexion
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
