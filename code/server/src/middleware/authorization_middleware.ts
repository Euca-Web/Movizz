import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthMiddleware {
    //vérifier la validité du token et le role de l'utilisateur
    public check = (roles : string[]) => (req: Request, res: Response, next: NextFunction) => {
        // console.log(roles);
        //récupérer le contenu dans l'entête Autorization: Bearer token
        const token = req.headers.authorization?.split("Bearer ")[1];
        // console.log(token);

        if (!token) {
            res.status(401).json({
                status: 401,
                message: process.env.NODE_ENV === "prod" ? 'Error' : "Unauthorized - Missing token"
            });
            return;
        }

        let tokenDecoded: JwtPayload;

        try {
            tokenDecoded = jwt.verify(
                token as string,
                process.env.JWT as string
            ) as JwtPayload;
            // console.log(tokenDecoded);

        } catch (error) {
            res.status(401).json({
                status: 401,
                message: process.env.NODE_ENV === "prod" ? 'Error' : "Unauthorized - Invalid token"
            });
            return;

        }

        // vérifier le role de l'utilisateur
        if (roles.indexOf(tokenDecoded.user.role_id.toString()) === -1) {
            res.status(401).json({
                status: 401,
                // afficher un simple message d'erreur
                message : process.env.NODE_ENV === "prod" ? 'Error' : "Unauthorized - Invalid role"
            });
            return;
        }
 
        //passer au middleware suivant
        next();
    };
}
export default AuthMiddleware;