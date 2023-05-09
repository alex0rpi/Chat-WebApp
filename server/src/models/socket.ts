import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { ActiveUser } from './Interfaces';
import * as eventListeners from './eventListeners-Emitters';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot `◑_◐´';
  public activeUsers: ActiveUser;
  /* serverSocket.users is an object of user objects like this, where the key is the user object stringified and the value is his/her socket id:
  {
    '{"userId":1,"userName":"admin"}': '1Y2Z3X4W5V6U7T8S9R0Q',
    '{"userId":2,"userName":"person"}': 'TY6Z3X4W5V6U7T8S9PO0',
    ...
  } */

  constructor(server: HTTPServer) {
    ServerSocket.instance = this; // this is a singleton class, so we set the instance to this class.
    this.activeUsers = {}; // {uid: socket.id, uid: socket.id, ...}
    this.io = new Server(server, {
      // initialize the socket.io server
      serveClient: false, // don't serve the client files
      pingInterval: 10000, // send pings every 10 seconds
      pingTimeout: 5000, // consider a client disconnected after 5 seconds of inactivity
      cookie: false, // don't use cookies
      cors: {
        origin: '*', // allow all origins
      },
    });
    this.io.on('connect', this.StartListeners); //socket will be injected in here by the io.on('connect') event
    console.info('Socket.io server started, awaiting connections...📡📡');
  }

  StartListeners = (socket: Socket) => {
    // *SOCKET IDS ARE UNIQUE TO EACH CONNECTION OR BROWSER WINDOW
    console.info('Life signs received from: ' + socket.id);

    // !Handle connection event
    socket.on('integrate', (loggedUser, callback) => {
      eventListeners.integrate(this, socket, loggedUser, callback);
    });

    socket.on('disconnect', () => {
      eventListeners.disconnect(this, socket);
    });

    socket.on('enter_room', (userId, roomName) => {
      eventListeners.enterRoom(this, userId, roomName);
    });

    socket.on('new_message', (data) => {
      eventListeners.newMessage(this, data);
    });

    socket.on('create_room', (roomName) => {
      eventListeners.createRoom(this, roomName);
    });
  };

  GetUinfoKeyFromSocketId = (id: string) =>
    Object.keys(this.activeUsers).find((uInfoKey) => this.activeUsers[uInfoKey] === id);

  /**
   * Send a message though the socket
  //  * @param {*} name The ename of the event, ex: integrate
  //  * @param {*} users List of socket id's
  //  * @param {*} payload any information needed
   */
  SendMessage = (event: string, users: string[], payload?: string[] | string) => {
    console.log(`Server emits event: #${event}# to `, users);
    users.forEach((id) => {
      payload ? this.io.to(id).emit(event, payload) : this.io.to(id).emit(event);
    });
  };
}
