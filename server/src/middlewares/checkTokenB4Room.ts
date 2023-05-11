import 'dotenv/config';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../controllers/helpers/ErrorHandler';
import { TokenPayloadInterface } from '../models/Interfaces';

export const checkTokenB4Room: RequestHandler = (req: any, res, next) => {
  if (!req.headers['token']) {
    const error = new InvalidTokenError(
      'Authorization failed due to invalid or non existing token',
      403
    );
    return res.json(error);
  }

  const userToken = req.headers['token']?.toString().split(' ')[1];
  //   let tokenPayload: TokenInterface = {};
  let tokenPayload: any; // No funciona el TokenPayloadInterface
  try {
    tokenPayload = jwt.verify(userToken, 'chatapp'); // change to env variable
    if (!tokenPayload) {
      const error = new InvalidTokenError(
        'Authorization failed due to invalid or non existing token',
        403
      );
      return res.json(error);
    }
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(500).json(error);
  }

  // TODO check if token is expired #############################################
  // if(token is expired){
  //   const error = new InvalidTokenError(
  //     'Authorization failed due to EXPIRED token',
  //     403
  //   );
  //   return res.json(error);
  // }

  //   If token is correct and not expired
  req.uid = tokenPayload!.userId;
  // now we can access this property in the next middleware

  next();
};
