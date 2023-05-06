import express from 'express';

import * as roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', roomController.getRooms);
router.post('/create', roomController.createRoom);

export default router;
