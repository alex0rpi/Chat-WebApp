import express from 'express';
import * as roomController from '../controllers/roomController';
import { roomValidate } from '../controllers/helpers/roomValidate';
import { checkTokenB4Room } from '../middlewares/checkTokenB4Room';

const router = express.Router();

//! app.use('/rooms', roomRoutes);

router.get('/', checkTokenB4Room, roomController.getRooms);

// The user who logged in should already have a token, so if it passes the checkTokenB4RoomCreate middleware, then he/she can create a room.
router.post('/create', checkTokenB4Room, roomValidate, roomController.createRoom);

export default router;
