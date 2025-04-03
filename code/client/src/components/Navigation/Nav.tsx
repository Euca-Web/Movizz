import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../provider/UserProvider"; // Ensure this import exists
import '../Navigation/Nav.css';

const Nav = () => {


	//récupérer l'utilisateur

	const { user } = useContext(UserContext); // récupère le contexte

	// Les balises a sont remplacées par le composant
	//  les attributs href sot remplacés par to
	return (
		<>
			{JSON.stringify(user)}
			{/* 
            attribut ref permet de relier un référence à une balise HTML 
            */}
			{/* 
            la seule condition disponible dans le HTML du react : condition ternaire
            condition ? vraie : faux
            si une autre condition est à utiliser, il est nécessaire de crée une fonction externe
            */}
			<nav>
				<Link to={"/"}> Home </Link>

				{user.role_id === 2 ? (
				<Link to={'/admin'}>Administration</Link>
				) : null}
				
				{user.role_id ? (
					<Link to={"/logout"}> Déconnexion </Link>
				) : (
					<>
						<Link to={"/register"}> Inscription </Link>
						<Link to={"/login"}> Connexion </Link>
					</>)}

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
			
			</nav>
			{/* ajouter des évènements : 
                - utiliser l'évènement directement dans la balise 
                - dans le composant on crée une fonction lié à l'évènement
            */}
		</>
	);
};
export default Nav;
