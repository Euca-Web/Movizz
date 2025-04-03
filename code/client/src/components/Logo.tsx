import type React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Logo.css"; // Adjust the path as necessary

const Logo: React.FC = () => {
	return (
		<Link to="/" className="logo">
			<img src="/assets/svg/logo.svg" alt="Movizz" className="logo-image" />
		</Link>
	);
};

export default Logo;
