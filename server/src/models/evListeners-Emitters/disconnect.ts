import { Socket } from 'socket.io';
import { ServerSocket } from '../socket';
// import { enterRoom } from './enterRoom';
import {
  roomRepository,
  userRoomRepository,
} from '../../infrastructure/dependecy-injection';

export const disconnect = async (serverSocket: ServerSocket, socket: Socket) => {
  const userToDisconnect = serverSocket.GetUinfoKeyFromSocketId(socket.id);
  // get the whole user object from the socket id
  /* {
    userId: loggedUser.userId,
    userName: loggedUser.userName
  }*/

  const userInfoToDisconnect = JSON.parse(userToDisconnect!);

  if (userInfoToDisconnect) {
    // const user = JSON.parse(userToDisconnect);
    // enterRoom(serverSocket, user.userId, 'welcome'); // enter the user in the welcome chat room

    // Borra el usuario de la lista de users actius
    await userRoomRepository!.deleteUserRooms(userInfoToDisconnect.userId);

    //* Get the updated list all rooms with their users
    const rooms = await roomRepository!.getAllRoomsAndUsers();

    // Delete user from active users list
    delete serverSocket.activeUsers[userToDisconnect!];

    // Retrieve updated list of active users
    const users = Object.keys(serverSocket.activeUsers);
    //* users here is an array of user objects but it is stringified.
    //* Abans era Object.values (socketid), ara passo keys, que tenen més info rellevant: userId i userName
    serverSocket.io.emit('update_user_room', { users, rooms });
    // serverSocket.SendMessage('user_disconnected', users, socket.id);
    // send the users array to all remaining connected users.
  }
};
