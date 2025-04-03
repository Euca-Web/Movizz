import express from 'express';
import ContactController from "../controller/contact_controller.js";

class ContactRouter {
    // Propriétés
    private router = express.Router();

    // Méthode
    public getRoutes = () => {
        this.router.get("/", new ContactController().index);

        this.router.post("/", new ContactController().insert);

        // this.router.put("/", new ContactController().update);

        this.router.delete("/", new ContactController().delete);

        return this.router;
    };
}

export default ContactRouter;