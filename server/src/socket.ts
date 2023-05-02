import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
// import { v4 } from 'uuid';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot `◑﹏◐´';

  public users: {
    [uid: string]: string; // we define both the key and value as strings.
    //* IT IS AN OBJECT, NOT AN ARRAY. AN OBJECT CONTAINING:
    // {sdfdsfdsfssf: socketId, 435o4i35o4i3j5: socketId, ...}
    // We do this to easily query the object for the socket ID of a user with a specific uid with a dynamic key [keyName]
  };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this; // this is a singleton class, so we set the instance to this class.
    this.users = {}; // initialize the users object
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
    this.io.on('connect', this.StartListeners);

    console.info('Socket.io server started');
  }

  StartListeners = (socket: Socket) => {
    // Here we'll have all the listeners for the socket.io server

    socket.on('connection', () => {
      // check is the user is new to the world
      console.log('New user connected!!!!!');
      socket.broadcast.emit('message', `${this.botName}: A new user has joined the welcome chat`);
    });

    socket.on('chatMsg', (message: string) => {
      // when a user sends a message
      console.log(message);
      // socket.broadcast.emit('message', message);
    });
  };
}
