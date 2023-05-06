import express from 'express';
import * as roomController from '../controllers/roomController';
import { roomValidate } from '../controllers/helpers/roomValidate';
import { checkTokenB4RoomCreate } from '../middlewares/checkTokenB4RoomCreate';

const router = express.Router();

router.get('/', roomController.getRooms);

// The user who logged in should already have a token, so if it passes the checkTokenB4RoomCreate middleware, then he/she can create a room.
router.post('/create', checkTokenB4RoomCreate, roomValidate, roomController.createRoom);

export default router;
