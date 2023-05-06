import { check } from 'express-validator';
import { MESSAGES } from './validatorMessages';

export const userRegisterValidate = [
  check('userName', MESSAGES.USERREQUIRED).not().isEmpty(),
  check('displayName', MESSAGES.DISPLAYNAMEREQUIRED).not().isEmpty(),
  check('password', MESSAGES.PASSWORDREQUIRED).not().isEmpty(),
];
