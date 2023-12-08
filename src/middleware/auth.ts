import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../models';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await prisma.user.findMany();
    const user = await prisma.user.findFirst({ where: { email } });
    console.log(users)
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      return res.status(401).json({ error: 'Invalid password' });
    } else {
      return jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      }, (err, token) => {
        if (err) {
          console.error('Erreur lors de la connexion de l\'utilisateur :', err);
          res.status(500).json({ error: (err as Error).message || 'Internal Server Error' });
        } else {
          console.log('Utilisateur connecté avec succès. Jeton JWT généré :', token);
          res.json({ token });
        }
      });
    }
    
  } catch (e) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', e);
    res.status(500).json({ error: (e as Error).message || 'Internal Server Error' });
  }
});

export default router;
