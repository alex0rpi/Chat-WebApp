import express from 'express';
import * as userController from '../controllers/userController';
import { userRegisterValidate } from '../controllers/helpers/userRegisterValidate';
import { userLoginValidate } from '../controllers/helpers/userLoginValidate';
import { validateToken } from '../middlewares/validateToken';

const router = express.Router();

router.post('/register', userRegisterValidate, userController.registerUser);

router.post('/login', userLoginValidate, userController.loginUser);

router.post('/tokeninfo', validateToken)

router.post('/logout', userController.logOutUser);

export default router;
