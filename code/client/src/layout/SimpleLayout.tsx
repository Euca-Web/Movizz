import type React from "react";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../styles/layout/SimpleLayout.css"; // Adjust the path as necessary

const SimpleLayout: React.FC = () => {
	return (
		<div className="simple-layout">
			<BackButton />
			<main className="main-content">
				<div className="content-container">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default SimpleLayout;
