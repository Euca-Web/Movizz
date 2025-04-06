import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";
import "../assets/css/common/Navigation.css";

const Nav = () => {
	const { user } = useContext(UserContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="navigation">
			<button type="button" className="burger-menu" onClick={toggleMenu}>
				☰
			</button>
			<div className="nav-logo">LOGO</div>
			<div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
				<Link to={"/"}>Home</Link>

				{user.role_id === 2 && <Link to={"/admin"}>Administration</Link>}

				{user.role_id ? (
					<Link to={"/logout"}>Déconnexion</Link>
				) : (
					<>
						<Link to={"/register"}>Inscription</Link>
						<Link to={"/login"}>Connexion</Link>
					</>
				)}

				<div className="nav-buttons">
					<button className="nav-button" type="button">
						A à Z
					</button>
					<button className="nav-button" type="button">
						Dernières sorties
					</button>
					<button className="nav-button" type="button">
						Vue compact
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
