import express, { type Response, type Request } from "express";
import roleController from "../controller/role_controller.js";

class roleRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new roleController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:role_id", new roleController().one)
		
		return this.routeur;
	};
}

export default roleRouter;
