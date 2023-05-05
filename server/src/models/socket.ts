import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { activeUser } from './Interfaces';
const { disconnect, handshake, createRoom, enterRoom, newMessage } = require('./event_listeners/');

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot `◑_◐´';
  public activeUsers: activeUser | {};

  constructor(server: HTTPServer) {
    ServerSocket.instance = this; // this is a singleton class, so we set the instance to this class.
    this.activeUsers = {};
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
    socket.on('handshake', (loggedUser, callback) => {
      handshake(this, socket, loggedUser, callback);
    });

    socket.on('disconnect', () => {
      disconnect(this, socket);
    });

    socket.on('create_room', (roomName) => {
      createRoom(this, roomName);
    });

    socket.on('enter_room', (userId, roomName) => {
      enterRoom(this, userId, roomName);
    });

    socket.on('new_message', (data) => {
      newMessage(this, data);
    });
  };

  GetUidFromSocketId = (id: string) => Object.keys(this.activeUsers).find((uid) => this.activeUsers[uid] === id);

  /**
   * Send a message though the socket
   * @param {*} name The ename of the event, ex: handshake
   * @param {*} users List of socket id's
   * @param {*} payload any information needed
   */
  SendMessage = (event: string, users, payload) => {
    console.log(`Emmitting event: ${event} to `, users);
    users.forEach((id) => {
      payload ? this.io.to(id).emit(event, payload) : this.io.to(id).emit(event);
    });
  };
}
