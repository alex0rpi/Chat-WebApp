import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';
import { User } from '../models/Interfaces';
import { v4 } from 'uuid';

export let activeUsers: User[] = [];

export const createUser: RequestHandler = async (req, res) => {
  try {
    const existingUser = await userRepository?.retrieveByName(req.body.username);
    if (!existingUser) {
      const newUser = {
        username: req.body.username,
        room: 'welcome',
        active: true,
      };
      await userRepository?.create(newUser.username, newUser.active, newUser.room);
      const activeUsernamesList = await userRepository?.retrieveUsers('welcome');
      activeUsers = activeUsernamesList.map((item: { username: string }) => {
        return {
          uid: v4(),
          username: item.username,
        };
      });
      console.log(activeUsers)
      return res.status(201).send();
    }
    // If user exists and is not active, change active status to true and put in the "welcome" room.
    await userRepository?.setUserActive(existingUser.username);
    activeUsers = await userRepository?.retrieveUsers('welcome');
    return res.status(201).send();
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    activeUsers = await userRepository?.retrieveUsers();
    return res.status(200).json(activeUsers);
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ message: error.message });
  }
};

export const logOutUser: RequestHandler = async (req, res) => {
  const uid: number = Number(req.params.uid);
  await userRepository?.setUserLoggedOut(uid);
  return res.sendStatus(204);
};
