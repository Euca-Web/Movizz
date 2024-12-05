import http from "node:http";
import express, { type Router, type Express, type Request, type Response } from "express";
import HomePageRouter from "../router/homepage_routeur.js";
import NotFoundRouter from "../router/not_found_router.js";
class Server {
// instancier une application Express
    private app: Express = express();
// définir un routeur pour Express
    private router: Router = express.Router();
constructor() {
// lier l'application Express au routeur
    this.app.use(this.router);
// définir la liste des routeurs
    this.getRoutersList();
}
// liste des routeurs
    private getRoutersList = (): void => {
// création de la route d'accueil en GET
        this.router.use('/', new HomePageRouter().getRoutes());


    // Routeur des routes inexistantes doit être OBLIGATOIREMENT en dernière position
    this.router.use('*', new NotFoundRouter().getRoutes());
};
// créer un serveur Node.js / Express
public createServer = (): http.Server => {
    return http.createServer(this.app);
};
}
export default Server;