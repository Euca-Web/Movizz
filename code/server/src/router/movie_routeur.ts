import express, { type Response, type Request } from "express";
import movieController from "../controller/movie_controller.js";

class movieRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new movieController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:movie_id", new movieController().one)
		
		return this.routeur;
	};
}

export default movieRouter;
