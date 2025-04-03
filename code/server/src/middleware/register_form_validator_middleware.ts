import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import RegisterFormValidator from "../validator/register_form_validator.js";

class RegisterFormValidatorMiddleware {
	// Validation de la saisie
	public validate = async (req: Request, res: Response, next: NextFunction) => {
	// Envoyer la saisie 
	const isValid = await new RegisterFormValidator().isValid(req.body);
	console.log(isValid)

	// Si une erreur de validation est renvoyée
	if (isValid instanceof Error) {
		res.status(400).json({
			status: 400,
			// Afficher un simple message pour le production, sinon afficher l'erreur
			message: process.env.NODE_ENV === "prod" ? 'Error' : isValid,
		})
	// Bloquer la suite du script
	return;
	}
	// Passer le middleware suivant
	next();
};
}
export default RegisterFormValidatorMiddleware;