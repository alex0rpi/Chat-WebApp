import { ServerSocket } from '../socket';
import { messageRepository, roomRepository } from '../../infrastructure/dependecy-injection';
import { MessageData } from '../Interfaces';

export const newMessage = async (serverSocket: ServerSocket, data: MessageData) => {
  if (!data.message) return false;
  try {
    const { userId, roomName, message } = data;
    // Recupera el usuario y el room
    const room = roomName ? await roomRepository!.retrieveRoomByName(roomName) : 0;

    // save message on db
    await messageRepository!.createMessage(message, userId, room.roomId);

    // Recupera todos los mensajes para la sala que hubo cambios
    const messages = await messageRepository!.retrieveRoomMessages(room.roomId);

    serverSocket.io.emit('update_messages', room.roomName, messages);
  } catch (err) {
    console.log('update_messages fail:', err);
  }
};
