import 'dotenv/config';
import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';
import bcrypt from 'bcrypt';
import { NotCorrectParamsError } from './helpers/ErrorHandler';
import { Result, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const registerUser: RequestHandler = async (req, res) => {
  const result: Result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new NotCorrectParamsError('Incorrect fields provided', 422, errors);
    return res.json(error);
  }
  try {
    let { username, displayName, password } = req.body;
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    const newUser = userRepository!.create(username, displayName, hashedPw);
    return res.status(200).json({ user: newUser, message: `new user -${username}- created. ` });
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(500).json(error);
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const result: Result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new NotCorrectParamsError('Incorrect fields provided', 422, errors);
    return res.json(error);
  }
  try {
    const existingUser = await userRepository!.retrieveByName(req.body);
    if (!existingUser) {
      const error = new NotCorrectParamsError('User not found', 422);
      return res.json(error);
    }
    const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isMatch) {
      const error = new NotCorrectParamsError('Incorrect password.', 422);
      return res.json(error);
    }
    const token = jwt.sign(
      {
        username: existingUser.username,
        userId: existingUser.userId,
        displayName: existingUser.displayName,
      },
      'chatapp', // this shoule be process.env.JWT_KEY but it's not working with dotenv
      {
        expiresIn: '24h',
      }
    );
    res.setHeader('authorization', 'Bearer ' + token);
    res.json({ token, user: existingUser });
  } catch (error) {
    if (error instanceof Error) return res.status(500).json(error);
  }
};

export const logOutUser: RequestHandler = async (req, res) => {};

// export const getUsers: RequestHandler = async (req, res) => {
//   try {
//     activeUsers = await userRepository?.retrieveUsers();
//     return res.status(200).json(activeUsers);
//   } catch (error) {
//     if (error instanceof Error) return res.status(500).json({ message: error.message });
//   }
// };

// export const logOutUser: RequestHandler = async (req, res) => {
//   const uid: number = Number(req.params.uid);
//   await userRepository?.setUserLoggedOut(uid);
//   return res.sendStatus(204);
// };
