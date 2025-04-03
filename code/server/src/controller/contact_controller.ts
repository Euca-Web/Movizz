import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository.js";

class ContactController {
	// Récupérer tous les documents
	public index = async (req: Request, res: Response) => {
		const results = await new ContactRepository().selectAll();

		// réponse HTTP
		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
        // Créer un enregistrement
        // req.body permet de récupérer le contenu de la requête HTTP
        const results = await new ContactRepository().insert(req.body);

        // Si la requête SQL renvoie une erreur
        if (results instanceof Error){
            res.status(400).json({
                status: 400,
                // Afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? 'Error' : results.message
            });
            // Bloquer la suite du script
            return;
        }
        
        // status: Code du statut HTTP
        // json: Formater une réponse en JSON
        res.status(201).json({
            status: 201,
            message: "Contact request created",
            data: results
        });
        return;
    };

    // public update = async (req: Request, res: Response) => {
    //     // Créer un enregistrement
    //     // req.body permet de récupérer le contenu de la requête HTTP
    //     const results = await new ContactRepository().update(req.body);

    //     // Si la requête SQL renvoie une erreur
    //     if (results instanceof Error){
    //         res.status(400).json({
    //             status: 400,
    //             // Afficher un simple message pour la production, sinon afficher l'erreur
    //             message: process.env.NODE_ENV === "prod" ? 'Error' : results  
    //         });
    //         // Bloquer la suite du script
    //         return;
    //     }
        
    //     // status: Code du statut HTTP
    //     // json: Formater une réponse en JSON
    //     res.status(201).json({
    //         status: 201,
    //         message: "Contact request updated",
    //         data: results
    //     });
    //     return;
    // };

    // public delete = async (req: Request, res: Response) => {
    //     // Créer un enregistrement
    //     // req.body permet de récupérer le contenu de la requête HTTP
    //     const results = await new ContactRepository().delete(req.body);

    //     // Si la requête SQL renvoie une erreur
    //     if (results instanceof Error){
    //         res.status(400).json({
    //             status: 400,
    //             // Afficher un simple message pour la production, sinon afficher l'erreur
    //             message: process.env.NODE_ENV === "prod" ? 'Error' : results  
    //         });
    //         // Bloquer la suite du script
    //         return;
    //     }
        
    //     // status: Code du statut HTTP
    //     // json: Formater une réponse en JSON
    //     res.status(201).json({
    //         status: 201,
    //         message: "Contact request deleted",
    //         data: results
    //     });
    //     return;
    // };

    public delete = async (req: Request, res: Response) => {
        // Créer un enregistrement
        // req.body permet de récupérer le contenu de la requête HTTP
        const results = await new ContactRepository().delete(req.body);

        // Si la requête SQL renvoie une erreur
        if (results instanceof Error){
            res.status(400).json({
                status: 400,
                // Afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? 'Error' : results.message  
            });
            // Bloquer la suite du script
            return;
        }
        
        // status: Code du statut HTTP
        // json: Formater une réponse en JSON
        res.status(201).json({
            status: 201,
            message: "Contact request deleted",
            data: results
        });
        return;
    };
}

export default ContactController;
