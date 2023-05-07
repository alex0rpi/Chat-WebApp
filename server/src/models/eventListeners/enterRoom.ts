import { ServerSocket } from '../socket';
import {
  userRepository,
  roomRepository,
  userRoomRepository,
} from '../../infrastructure/dependecy-injection';
import { newMessage } from './newMessage';

// When a user enters a room, he/she is removed from the previous one, so, several things happen.

export const enterRoom = async (serverSocket: ServerSocket, userId: number, roomName?: string) => {
  try {
    // Retrieve user and next room where he/she wants to enter
    const user = await userRepository!.retrieveById(userId); //id & username
    const nextRoom = roomName ? await roomRepository!.retrieveRoomByName(roomName) : 'welcome';

    // *Recover the previous room where the user was ---- REVISAR ESTO
    const previousUserRoom = await userRoomRepository?.findRoomByUserId(userId); // returns an object
    const previousRoom = previousUserRoom?.roomId
      ? await roomRepository!.retrieveRoomById(previousUserRoom.roomId) // a room other than the welcome room.
      : 'welcome';
    // userRooms table only contains roomIds other than the welcome room.

    // Delete current user from any other previous rooms he/she was in.
    await userRoomRepository!.deleteUserRooms(user.userId);

    // Add user to the new room at the userRoom table (which is the one that contains the userId and the roomId)
    ////  if (nextRoom) await user.addRoom(nextRoom);
    if (nextRoom) await userRoomRepository!.addUserToRoom(userId, nextRoom.roomId);

    // The user is in the new room ###########################

    // ! Now we prepare to inform the other users in the entered room and the ones of the previous room.
    // Get the list of users of the previous room and the current room.

    const rooms = await roomRepository!.getAllRoomsAndUsers();

    if (roomName) {
      const data = {
        userId: null,
        roomName, // this is the new current room being informed of the new arrival.
        message: `${user.username} joined the room👏🏻`,
      };

      newMessage(serverSocket, data);
    }

    if (previousRoom !== 'welcome' && nextRoom === 'welcome') {
      // Previous room will be informed as long as it is not the "welcome" room.
      const data = {
        userId: null,
        roomName: previousRoom.roomName,
        message: `${user.username} is gone bye bye 👋🏻👋🏻`,
      };

      newMessage(serverSocket, data);
    }

    serverSocket.io.emit('update_user_room', { user, nextRoom, rooms });
    // Emit this information to the client side so proper updates are made.
  } catch (err) {
    console.log('update_user_room fail:', err);
  }
};
