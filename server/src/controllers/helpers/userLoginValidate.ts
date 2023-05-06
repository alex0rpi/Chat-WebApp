import { check } from 'express-validator';
import { MESSAGES } from './validatorMessages';

export const userLoginValidate = [
  check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
  check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty(),
];
