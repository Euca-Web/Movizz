import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }});

export const sendConfirmationEmail = async (to: string) => {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject: "Confirmation de réception de votre message",
			html: `
        <h1>Bonjour,</h1>
        <p>Bienvenue sur Movizz !</p>
        <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contacté.</p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,</p>
        <p>L'équipe de support</p>
        <p>Ce message a été envoyé automatiquement, merci de ne pas y répondre.</p>
        `,
		};
        return transporter.sendMail(mailOptions);
	}