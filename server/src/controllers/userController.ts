import config from '../config';
import { RequestHandler } from 'express';
import { userRepository } from '../infrastructure/dependecy-injection';
import bcrypt from 'bcrypt';
import { NotCorrectParamsError } from './helpers/ErrorHandler';
import { Result, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { TokenPayloadInterface } from '../models/Interfaces';

export const registerUser: RequestHandler = async (req, res) => {
  const result: Result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new NotCorrectParamsError('Incorrect fields provided', 422, errors);
    return res.json(error);
  }
  try {
    let { userName, password } = req.body;
    const existingUser = await userRepository!.retrieveByName(userName);
    if (existingUser) {
      const error = new NotCorrectParamsError('User already exists', 400);
      return res.json(error);
    }
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    const newUser = await userRepository!.create(userName, hashedPw);

    const tokenPayload: TokenPayloadInterface = {
      userName: newUser.userName,
      userId: newUser.userId,
    };
    const token = jwt.sign(tokenPayload, config.SECRET, {
      expiresIn: '1h',
    });
    res.setHeader('authorization', 'Bearer ' + token);
    return res.json({
      payload: {
        token,
        user: newUser,
        message: `new user -${userName}- created. `,
      },
    });
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
    let { userName, password } = req.body;
    const existingUser = await userRepository!.retrieveByName(userName);
    if (!existingUser) {
      const error = new NotCorrectParamsError('User not found', 422);
      return res.json(error);
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      const error = new NotCorrectParamsError('Incorrect password.', 422);
      return res.json(error);
    }
    const tokenPayload: TokenPayloadInterface = {
      userName: existingUser.userName,
      userId: existingUser.userId,
    };
    const token = jwt.sign(tokenPayload, config.SECRET, {
      expiresIn: '1h',
    });
    res.setHeader('authorization', 'Bearer ' + token);
    return res.json({
      payload: {
        token,
        user: existingUser,
      },
    });
  } catch (error) {
    if (error instanceof Error) return res.status(500).json(error);
  }
};
