import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ContactAPI from "../../service/ContactAPI";
import "./Contact.css";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const Contact: React.FC = () => {
	const {
		handleSubmit,
		register,
		reset, // Ajout de la méthode reset
		formState: { errors },
	} = useForm<FormData>();

	const [message, setMessage] = useState<string>();
	const [success, setSuccess] = useState<boolean>(false); // État pour afficher le message de succès

	const onSubmit = async (values: FormData) => {
		console.log(values);

		try {
			// Requête HTTP via ContactAPI
			const request = await new ContactAPI().insert(values);
			console.log(request);

			// Tester le code de statut HTTP
			if ([200, 201].includes(request.status)) {
				setSuccess(true); // Afficher le message de succès
				setMessage("Votre message a été envoyé avec succès !");
				reset(); // Vider les champs du formulaire
			} else {
				setSuccess(false);
				setMessage("Erreur lors de l'envoi du message.");
			}
		} catch (error) {
			console.error("Erreur:", error);
			setSuccess(false);
			setMessage("Une erreur est survenue. Veuillez réessayer.");
		}
	};

	return (
		<div className="contact-page">
			<h1>Nous contacter</h1>

			<div className="contact-content">
				<div className="contact-info">
					<h2>Informations de contact</h2>
					<p>
						Pour toute question ou suggestion, n'hésitez pas à nous contacter
						via le formulaire ci-dessous ou directement par email.
					</p>
					<div className="contact-details">
						<p>Email: contact@movizz.com</p>
						<p>Téléphone: +33 1 23 45 67 89</p>
						<p>Adresse: 123 rue du Cinéma, 75000 Paris</p>
					</div>
				</div>

				<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
					{/* Afficher le message de confirmation ou d'erreur */}
					{message && (
						<div className={`status-message ${success ? "success" : "error"}`}>
							{message}
						</div>
					)}

					<div className="form-group">
						<label htmlFor="name">Nom</label>
						<input
							type="text"
							id="name"
							{...register("name", { required: "Nom requis" })}
						/>
						<small>{errors.name?.message}</small>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							{...register("email", {
								required: "Email requis",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Email invalide",
								},
							})}
						/>
						<small>{errors.email?.message}</small>
					</div>

					<div className="form-group">
						<label htmlFor="subject">Sujet</label>
						<input
							type="text"
							id="subject"
							{...register("subject", { required: "Sujet requis" })}
						/>
						<small>{errors.subject?.message}</small>
					</div>

					<div className="form-group">
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							rows={6}
							{...register("message", { required: "Message requis" })}
						/>
						<small>{errors.message?.message}</small>
					</div>

					<button type="submit" className="submit-button">
						Envoyer le message
					</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
