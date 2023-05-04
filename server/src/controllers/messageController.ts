import { RequestHandler } from 'express';
import { messageRepository } from '../infrastructure/dependecy-injection';
import moment from 'moment';
import { Message } from '../models/Interfaces';

export let displayMessages: Message[] = [];

export const createMsg: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    const newMsg = {
      text,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      UserId: 1,
      room: 'welcome',
    };
    await messageRepository?.createMessage(newMsg.text, newMsg.createdAt, newMsg.UserId);
    displayMessages = await messageRepository?.retrieveUserMessages(newMsg.UserId, newMsg.room);
    res.status(201).json(savedMsg);
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ message: error.message });
  }
};
