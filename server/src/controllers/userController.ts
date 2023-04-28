import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userRepository?.create(username);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};
