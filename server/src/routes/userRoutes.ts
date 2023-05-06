import express from 'express';
import * as userController from '../controllers/userController';
import { userValidate } from '../controllers/helpers/userValidate';
import { validateToken } from '../middlewares/validateToken';

const router = express.Router();

router.post('/register', userValidate, userController.registerUser);

// This API route will also allocate a token to the user who logs in.
router.post('/login', userValidate, userController.loginUser);

// At some point, the user will use this api route to check if the token is still valid.
router.post('/tokeninfo', validateToken)

router.post('/logout', userController.logOutUser);

export default router;
