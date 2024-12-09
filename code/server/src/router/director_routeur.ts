import express, { type Response, type Request } from "express";
import directorController from "../controller/director_controller.js";

class directorRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new directorController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:director_id", new directorController().one)
		
		return this.routeur;
	};
}

export default directorRouter;
