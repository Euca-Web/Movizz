import type React from "react";
import { Link } from "react-router-dom";
import "../assets/css/common/Footer.css"; // Adjust the path as necessary
import logo from "../assets/svg/logo.svg";

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-content">

				<div className="footer-logo">
					<img
						src={logo}
						alt="Movizz"
						className="footer-logo-image"
				/>
					
				</div>
				<div className="footer-links">
					<Link to="/mentions-legales">Mentions Légales</Link>

					<Link to="/conditions-utilisation">Conditions d'utilisation</Link>
					
					<Link to="/contact">Nous contacter</Link>
				</div>

				
				<p className="copyright">© 2025 Movizz. Tous droits réservés.</p>
			</div>
		</footer>
	);
};

export default Footer;
