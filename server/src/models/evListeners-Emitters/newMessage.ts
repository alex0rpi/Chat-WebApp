import { ServerSocket } from '../socket';
import {
  messageRepository,
  roomRepository,
} from '../../infrastructure/dependecy-injection';
import { MessageData, Room } from '../Interfaces';

export const newMessage = async (serverSocket: ServerSocket, data: MessageData) => {
  const { userId, userName, roomName, message } = data;
  try {
    // Retrieve room object where msg came from
    debugger;
    const room = await roomRepository!.retrieveRoomByName(roomName);
    // *AQUI AL DEBUGGER SEMBLA QUE HI HA UN PROBLEMA, NO PROGRESSA i va directe al catch.
    console.log(room);

    // save message on db
    await messageRepository!.createMessage(userId, userName, room.roomId, message);

    // Get all updated messages for this room, including their respective user info.
    const messages = await messageRepository!.retrieveRoomMessages(room.roomId);

    // Send updated messages to all users in the room
    serverSocket.io.emit('update_messages', {
      roomName,
      newMessages: messages,
    });
  } catch (err) {
    console.log('update_messages fail:', err);
  }
};
