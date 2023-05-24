import { ServerSocket } from '../socket';
import { roomRepository } from '../../infrastructure/dependecy-injection';
import { RoomData } from '../Interfaces';

export const createRoom = async (serverSocket: ServerSocket, data: RoomData) => {
  const { roomName, isPrivate } = data;
  try {
    // check if roomName already is in use
    const existingRoom = await roomRepository!.retrieveRoomByName(roomName);
    if (!existingRoom) {
      await roomRepository!.createRoom(roomName, isPrivate);
      // Get the list all rooms with their users
      const rooms = await roomRepository!.getAllRoomsAndUsers();
      serverSocket.io.emit('update_rooms', rooms);
      // Room is created but user remains where he/she is.
    }
  } catch (err) {
    console.log('Create room fail:', err);
  }
};
