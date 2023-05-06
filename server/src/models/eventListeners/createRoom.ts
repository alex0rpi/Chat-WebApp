import { ServerSocket } from '../socket';
import { roomRepository } from '../../infrastructure/dependecy-injection';

export const createRoom = async (serverSocket: ServerSocket, roomName: string) => {
  try {
    await roomRepository!.createRoom(roomName);
    const rooms = await roomRepository!.getAllRooms();
    serverSocket.io.emit('update_rooms', rooms);
  } catch (err) {
    console.log('Create room fail:', err);
  }
};