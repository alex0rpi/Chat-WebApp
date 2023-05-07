import { Socket } from 'socket.io';
import { ServerSocket } from '../socket';
import { ActiveUser } from '../Interfaces';

interface HandshakeCallback {
  (uid: string, users: string[]): void;
}

export const handshake = (
  serverSocket: ServerSocket,
  socket: Socket,
  loggedUser: ActiveUser,
  callback: HandshakeCallback
) => {
  console.log('Handshake recieved from ' + socket.id);

  // Check if this is a reconnection
  const reconnected = Object.values(serverSocket.activeUsers).includes(socket.id);

  if (reconnected) {
    console.log('This user has reconnected');
    const uid = serverSocket.GetUinfoKeyFromSocketId(socket.id);

    if (uid) {
      const users = Object.values(serverSocket.activeUsers);
      // convert the obj to an array of socket ids
      console.log('Sending callback for reconnect ...');
      callback(uid, users);
      // cb func that will be executed on client side, where it will receive the uid (user info consisting of userId and userName), and users array.
      return;
    }
  }

  // Register logged user
  const uid = JSON.stringify({
    userId: loggedUser.userId,
    userName: loggedUser.userName,
  });

  serverSocket.activeUsers[uid] = socket.id;
  // serverSocket.activeUsers is an obj like:
  // { 
    // '{"userId":1,"userName":"admin"}': '1Y2Z3X4W5V6U7T8S9R0Q' 
  // }

  const users = Object.values(serverSocket.activeUsers);
  // convert the obj to an array of socket ids
  console.log('Sending callback for handshake ...');
  callback(uid, users);

  // Send new user to all connected users
  serverSocket.SendMessage(
    'user_connected',
    users.filter((id) => id !== socket.id),
    users
  );
  //this sends the message to all connected users, except the one that just connected.
};
