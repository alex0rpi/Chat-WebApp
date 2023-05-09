import { ServerSocket } from '../socket';
import { messageRepository, roomRepository } from '../../infrastructure/dependecy-injection';
import { MessageData, Room } from '../Interfaces';

export const newMessage = async (serverSocket: ServerSocket, data: MessageData) => {
  if (!data.message) return false;
  try {
    const { userId, roomName, message } = data;
    // Retrieve room where msg came from
    let room: Room = await roomRepository!.retrieveRoomByName(roomName);

    console.log(room);

    // save message on db
    await messageRepository!.createMessage(message, userId, room.roomId);

    // Get all updated messages for this room, including their respective user info.
    const messages = await messageRepository!.retrieveRoomMessages(room.roomId);

    // Send updated messages to all users in the room
    serverSocket.io.emit('update_messages', room.roomName, messages);
  } catch (err) {
    console.log('update_messages fail:', err);
  }
};
