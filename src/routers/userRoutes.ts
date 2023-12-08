import express from 'express';
import { UserModel } from '../models';
import bcrypt from 'bcrypt';
import { UserType } from '../types';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await UserModel.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
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
    res.status(500).json({ error: (e as Error).message || 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;

  try {
    const updatedUser = await UserModel.updateUser(userId, updatedUserData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await UserModel.deleteUser(userId);

    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;