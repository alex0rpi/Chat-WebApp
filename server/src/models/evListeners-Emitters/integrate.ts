import { Socket } from 'socket.io';
import { ServerSocket } from '../socket';
import { ActiveUser } from '../Interfaces';

interface IntegrateCallback {
  (userId: string): void;
}

export const integrate = (
  serverSocket: ServerSocket,
  socket: Socket,
  loggedUser: ActiveUser,
  callback: IntegrateCallback
) => {
  console.log('Integrate recieved from ' + socket.id);

  // If it is a new connection, add it to the active users list
  // console.log(loggedUser);
  const userInfos = JSON.stringify({
    userId: loggedUser.userId,
    userName: loggedUser.userName,
  });

  serverSocket.activeUsers[userInfos] = socket.id;
  // serverSocket.activeUsers is an obj like:
  // {
  // '{"userId":1,"userName":"Alex"}': '1Y2Z3X4W5V6U7T8S9R0Q'
  // }

  console.log('Sending callback for integrate ...');
  callback(userInfos);
};
