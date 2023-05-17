import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { InvalidTokenError } from '../controllers/helpers/ErrorHandler';
import config from '../config' //sanitized env variables

export const validateUserToken: RequestHandler = async (req, res, next) => {
  if (!req.body.token) {
    const error = new InvalidTokenError(
      'Authentication failed due to invalid or non existing token',
      403
    );
    return res.json(error);
  }
  try {
    /*Authorization: 'Bearer TOKEN' so, the token is part of the authorization string that comes with the header.*/
    const decodedToken = jwt.verify(req.body.token, config.SECRET); //* change to env variable
    if (!decodedToken) {
      const error = new InvalidTokenError(
        'Authentication failed due to invalid or non existing token',
        403
      );
      return res.json(error);
    }
    res.status(200).json({ payload: decodedToken });
  } catch (err) {}
};
