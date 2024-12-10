import express, { type Response, type Request } from "express";
import userController from "../controller/user_controller.js";

class userRouter {
	private routeur = express.Router();

	public getRoutes = () => {
		this.routeur.get("/", new userController().index);
		// crée une variable de route en la préfixant d'un :
		this.routeur.get("/:user_id", new userController().one)
		
		return this.routeur;
	};
}

export default userRouter;
