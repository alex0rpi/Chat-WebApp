import { check } from 'express-validator';
import { ERRMSGS } from './validatorMessages';

export const roomValidate = [
  check('roomName', ERRMSGS.ROOMNAMEREQUIRED).not().isEmpty(),
];
