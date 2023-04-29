import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';
import moment from 'moment';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      connectedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      active: true,
      // room: null,
    };
    await userRepository?.create(newUser.username, newUser.connectedAt, newUser.active);
    res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const userList = await userRepository?.retrieveAll();
    res.status(200).json(userList);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};
