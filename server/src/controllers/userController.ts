import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';
import moment from 'moment';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const existingUser = await userRepository?.retrieveByName(req.body.username);
    if (!existingUser) {
      const newUser = {
        username: req.body.username,
        active: true,
        // no rooms for the moment
      };
      const savedUser = await userRepository?.create(newUser.username, newUser.active);
      return res.status(201).json({ user: savedUser });
    }
    // If user exists and is not active, change active status to true and update connectedAt.
    const user = { ...existingUser, connectedAt: moment().format('MMMM Do YYYY, h:mm:ss a'), active: true };
    return res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const userList = await userRepository?.retrieveUsers();
    return res.status(200).json(userList);
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message });
  }
};
