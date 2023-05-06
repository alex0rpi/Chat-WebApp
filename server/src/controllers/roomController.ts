import { RequestHandler } from 'express';
import { Result, validationResult } from 'express-validator';
import { NotCorrectParamsError } from './helpers/ErrorHandler';
import { roomRepository } from '../infrastructure/dependecy-injection';

export const createRoom: RequestHandler = async (req, res) => {
  const result: Result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    const error = new NotCorrectParamsError('Incorrect room name provided', 422, errors);
    return res.json(error);
  }
  try {
    const newRomm = await roomRepository!.createRoom(req.body.roomName);
    res.status(200).json({ message: 'Room created ^-^', payload: newRomm });
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(500).json(error);
  }
};

export const getRooms: RequestHandler = async (req, res) => {
  try {
    const rooms = await roomRepository!.getAllRooms();
    res.status(200).json({ payload: rooms });
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(500).json(error);
  }
};
