import express, { type Response, type Request } from "express";
import actorController from "../controller/actor_controller.js";

class actorRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new actorController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:actor_id", new actorController().one)
		
		return this.routeur;
	};
}

export default actorRouter;
