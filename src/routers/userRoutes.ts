import { Request, Response } from 'express';
import express from 'express';
import { validationResult, body } from 'express-validator';
import { UserModel } from '../models';
import bcrypt from 'bcrypt';
import { UserType } from '../types';
import prisma from '../utils/database';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  UserModel.getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});

router.get('/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  UserModel.getUserById(userId)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Erreur interne du serveur' }));
});

router.post('/', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: UserType = await UserModel.createUser({
      data: {
        email,
        password: encryptedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ error: (e as Error).message || 'Erreur interne du serveur' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
   await prisma.user.delete({
    where: {
      id: userId,
    },
   })
   return res.status(204).json({ message: 'User deleted' })
});

export default router;
