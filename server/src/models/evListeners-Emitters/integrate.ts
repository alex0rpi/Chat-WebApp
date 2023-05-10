import { Socket } from 'socket.io';
import { ServerSocket } from '../socket';
import { ActiveUser } from '../Interfaces';

interface IntegrateCallback {
  (uid: string, users: string[]): void;
}

export const integrate = (
  serverSocket: ServerSocket,
  socket: Socket,
  loggedUser: ActiveUser,
  callback: IntegrateCallback
) => {
  console.log('Integrate recieved from ' + socket.id);

  // Check if this is a reconnection
  const reconnected = Object.values(serverSocket.activeUsers).includes(socket.id);

  if (reconnected) {
    console.log('This user has reconnected');
    const current_uid = serverSocket.GetUinfoKeyFromSocketId(socket.id);

    if (current_uid) {
      const logged_users = Object.values(serverSocket.activeUsers);
      // convert the obj to an array of socket ids
      console.log('Sending callback for reconnect ...');
      callback(current_uid, logged_users);
      // cb func that will be executed on client side, where it will receive the uid (user info consisting of userId and userName), and users array.
      return;
    }
  }

  // If it is a new connection, add it to the active users list
  console.log(loggedUser);
  const current_uid = JSON.stringify({
    userId: loggedUser.userId,
    userName: loggedUser.userName,
  });

  serverSocket.activeUsers[current_uid] = socket.id;
  // serverSocket.activeUsers is an obj like:
  // {
  // '{"userId":1,"userName":"Alex"}': '1Y2Z3X4W5V6U7T8S9R0Q'
  // }

  const logged_users = Object.values(serverSocket.activeUsers); // convert the obj to array of socketIds
  console.log('Sending callback for integrate ...');
  callback(current_uid, logged_users);

  // Send new user to all connected users
  serverSocket.SendMessage(
    'user_connected',
    logged_users.filter((id) => id !== socket.id),
    logged_users // array of socket ids of all connected users
  );
  //this sends the message to all connected users, except the one that just connected.
};
