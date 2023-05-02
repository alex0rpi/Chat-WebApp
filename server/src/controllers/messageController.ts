import { RequestHandler } from 'express';
import { messageRepository } from '../infrastructure/dependecy-injection';
import moment from 'moment';

export const createMsg: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    const newMsg = {
      text,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      UserId: 1,
      //   room: null,
    };
    await messageRepository?.createMessage(newMsg.text, newMsg.createdAt, newMsg.UserId);
    res.status(201).json(newMsg);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};
