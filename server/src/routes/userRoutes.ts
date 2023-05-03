import express from 'express';

import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.patch('/:uid', userController.logOutUser);

export default router;
