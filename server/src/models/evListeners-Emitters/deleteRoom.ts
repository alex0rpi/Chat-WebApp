import { ServerSocket } from '../socket';
import { roomRepository } from '../../infrastructure/dependecy-injection';

export const deleteRoom = async (serverSocket: ServerSocket, roomName: string) => {
  try {
    await roomRepository!.deleteRoom(roomName);
    // Get the list all rooms with their users
    const rooms = await roomRepository!.getAllRoomsAndUsers();
    serverSocket.io.emit('update_rooms', rooms);
    // Room is created but user hasn't entered it.
  } catch (err) {
    console.log('Create room fail:', err);
  }
};
