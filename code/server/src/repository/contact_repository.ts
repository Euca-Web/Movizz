import { ObjectId } from "mongodb";
import type Contact from "../model/contact.js";
import MongoDBService from "../service/mongodb_service.js";

class ContactRepository {
	// Nom de la collection
	private collection = "contact";

	//  Récupérer tous les documents
	public selectAll = () => {
		// Connexion au serveur MongoDB
		const connection = new MongoDBService().connect();

		// console.log(connection);

		// Selectionner la collection
		const collection = connection.collection(this.collection);

		// Récupérer les documents
		return collection.find().toArray();
	};

	// Créer une demande de contact
	public insert = async (data: Partial<Contact>): Promise<Contact[] | unknown> => {
		// Validation des champs requis - Vérifie si les champs sont absents ou vides
		const email = data.email?.trim();
		const subject = data.subject?.trim();
		const message = data.message?.trim();

		if (!email || !subject || !message) {
			return new Error(
				"Les champs email, subject et message sont requis et ne peuvent pas être vides",
			);
		}

		// Connexion au serveur MongoDB
		const connection = await new MongoDBService().connect();
		// Requête MongoDB
		// CREATE (POST)
		const mongoQuery = async () => {
			return await connection.collection(this.collection).insertOne({
				email: email,
				subject: subject,
				message: message,
			});
		};

		// Exécuter la requête
		try {
			const result = await mongoQuery();
			return result;
		} catch (error) {
			return error instanceof Error
				? error
				: new Error("Erreur inconnue lors de l'insertion");
		}
	};

	// // Mettre a jour/Modifier une demande de contacte
	// public update = async (
	// 	data: Partial<Contact>,
	// ): Promise<Contact | unknown> => {
	// 	// Connexion au serveur MySQL
	// 	const connection = await new MongoDBService().connect();

	// 	// Requête MongoDB
	// 	const mongoQuery = async () => {
	// 		// Vérifier que data.id est défini
	// 		if (!data.id) {
	// 			throw new Error("A valid ID is required for update operation");
	// 		}

	// 		return await connection.collection(this.collection).updateOne(
	// 			{ id: data.id }, // Filtre pour trouver le document par id (champ personnalisé)
	// 			{
	// 				$set: {
	// 					// Mise à jour des champs spécifiés
	// 					email: data.email,
	// 					subject: data.subject,
	// 					message: data.message,
	// 				},
	// 			},
	// 		);
	// 	};

	// 	// Exécuter la requête
	// 	// try / catch: permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérer

	// 	try {
	// 		// Récupérer les resultats de la requete
	// 		// results représente le premier indice du array renvoyé
	// 		const [results] = [await mongoQuery()];

	// 		// Si la requête à réussi
	// 		return results;
	// 	} catch (error) {
	// 		// Si la requete à échoué
	// 		return error;
	// 	}
	// };

	// Supprimer une demande de contact
	public delete = async (
		data: Partial<Contact>): Promise<Contact | unknown> => {
		// Validation des champs requis
		if (!data._id) {
			return new Error(
				"Un _id valide est requis pour l'opération de suppression",
			);
		}

		// Connexion au serveur MongoDB
		const connection = await new MongoDBService().connect();

		// Requête MongoDB
		// DELETE
		const mongoQuery = async () => {
			return await connection.collection(this.collection).deleteOne({
				_id: new ObjectId(data._id),
			});
		};

		// Exécuter la requête
		try {
			const result = await mongoQuery();
			if (result.deletedCount > 0) {
				return {
					_id: data._id,
				} as Contact;
			}
			// Si rien n’a été supprimé (ID inexistant ou déjà supprimé)
			return new Error("Aucun contact trouvé avec cet _id pour suppression");
		} catch (error) {
			return error instanceof Error
				? error
				: new Error("Erreur inconnue lors de la suppression");
		}
	};
}

export default ContactRepository;