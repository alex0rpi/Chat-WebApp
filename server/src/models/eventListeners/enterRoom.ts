import { ServerSocket } from '../socket';
// import { User, Room, UserRoom } from '../initModels';
import { userRepository, roomRepository, userRoomRepository } from '../../infrastructure/dependecy-injection';
import { newMessage } from './newMessage';

export const enterRoom = async (serverSocket: ServerSocket, userId: number, roomName?: string) => {
  try {
    // Retrieve user and room
    const user = await userRepository!.retrieveById(userId);
    const newRoom = roomName ? await roomRepository!.retrieveRoomByName(roomName) : "welcome";

    // Recupera los datos del room existente
    const oldUserRoom = await userRoomRepository?.findRoomByUserId(userId);
    const oldRoom = oldUserRoom?.roomId ? await roomRepository!.retrieveRoomById(oldUserRoom.roomId) : "welcome";

    // Borra cualquier registro antiguo
    await userRoomRepository!.deleteUserRooms(user.userId);

    // Escribe el nuevo room //*Això no ho acabo d'entendre
    if (newRoom) {
      await user.addRoom(newRoom);
    }

    // Recupera la lista de rooms con los usuarios
    const rooms = await roomRepository!.getAllRoomsAndUsers();

    if (roomName) {
      const data = {
        userId: null,
        roomName,
        message: `${user.displayName} join the room`,
      };

      newMessage(serverSocket, data);
    }

    if (oldRoom !== 0 && newRoom === 0) {
      // User leaved room
      const data = {
        userId: null,
        roomName: oldRoom.roomName,
        message: `${user.displayName} left the room`,
      };

      newMessage(serverSocket, data);
    }

    serverSocket.io.emit('update_user_room', { user, newRoom, rooms });
  } catch (err) {
    console.log('update_user_room fail:', err);
  }
};
