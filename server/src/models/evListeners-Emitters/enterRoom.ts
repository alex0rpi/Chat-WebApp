import { ServerSocket } from '../socket';
import {
  userRepository,
  roomRepository,
  userRoomRepository,
} from '../../infrastructure/dependecy-injection';
import { newMessage } from './newMessage';

// When a user enters a room, he/she is removed from the previous one, so, several things happen.

export const enterRoom = async (
  serverSocket: ServerSocket,
  userId: number,
  roomName?: string
) => {
  try {
    // Retrieve user and next room where he/she wants to enter
    const user = await userRepository!.retrieveById(userId);  // userId & userName
    let nextRoom;
    if (roomName) {
      nextRoom = await roomRepository!.retrieveRoomByName(roomName);
    }

    // Get the previous room where the user was in, if any
    const previousRoom = await userRoomRepository?.findRoomByUserId(userId); // returns an object

    // Delete current user from any other previous rooms he/she was in.
    if (previousRoom) await userRoomRepository!.deleteUserRooms(user.userId);

    // Add user to the new room at the userRoom table (which is the one that contains the userId and the roomId)
    if (nextRoom) await userRoomRepository!.addUserToRoom(userId, nextRoom.roomId);

    // The user is in the new room ###########################

    // ! Now we prepare to inform the other users in the entered room and the ones of the previous room, and provide data.

    //* Get the list all rooms with their users
    const rooms = await roomRepository!.getAllRoomsAndUsers();

    if (roomName) {
      const data = {
        userId: null,
        roomName, // this is the new current room being informed of the new arrival.
        message: `${user.userName} joined the room👏🏻`,
      };

      newMessage(serverSocket, data);
    }

    if (previousRoom !== 'welcome' && nextRoom === 'welcome') {
      // Previous room will be informed as long as it is not the "welcome" room.
      const data = {
        userId: null,
        roomName: previousRoom.roomName,
        message: `${user.userName} is gone bye bye 👋🏻👋🏻`,
      };

      newMessage(serverSocket, data);
    }

    serverSocket.io.emit('update_user_room', { user, nextRoom, rooms });
    // Emit this information to the client side so proper updates are made.
  } catch (err) {
    console.log('update_user_room fail:', err);
  }
};
