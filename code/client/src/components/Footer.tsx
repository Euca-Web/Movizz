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

				{/* <div className="footer-socials">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <img
                            src="/path/to/instagram-icon.svg"
                            alt="Instagram"
                            className="social-icon"
                        />
                    </a>
                    <a href="mailto:contact@movizz.com" className="social-link">
                        <img
                            src="/path/to/mail-icon.svg"
                            alt="Email"
                            className="social-icon"
                        />
                    </a>
                </div> */}

				<p className="copyright">© 2025 Movizz. Tous droits réservés.</p>
			</div>
		</footer>
	);
};

export default Footer;
