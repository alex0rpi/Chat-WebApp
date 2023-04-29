import { RequestHandler } from 'express';
import { messageRepository } from '../infrastructure/dependecy-injection';
import moment from 'moment';

export const createMsg: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    const newMsg = {
      text,
    //   room: null,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      UserId: 2,
    };
    await messageRepository?.createMessage(newMsg.UserId, newMsg.text, newMsg.createdAt);
    res.status(201).json(newMsg);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};
