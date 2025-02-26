import express from 'express';
import { Contact } from '../models/contact.model';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message'
    });
  }
});

export default router;
