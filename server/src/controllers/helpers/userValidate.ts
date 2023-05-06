import { check } from 'express-validator';
import { ERRMSGS } from './validatorMessages';

export const userValidate = [
  check('userName', ERRMSGS.USERREQUIRED).not().isEmpty(),
  check('password', ERRMSGS.PASSWORDREQUIRED).not().isEmpty(),
];
