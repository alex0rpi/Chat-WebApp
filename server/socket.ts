import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot ◑﹏◐';

  /** LOCAL DATABASE OF USERS **/
  /* This allows the class to keep track of all connected users with their unique user IDs (uid) and their associated socket IDs. */
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

    socket.on('joinRoom', ({username, room}) => {
      
    })
    socket.on('new-user', (name: string, callback: Function) => {
      // check is the user is new to the world
      if (Object.values(this.users).includes(socket.id)) {
        // If the user is not already connected, we add them to the users object.
        this.users[v4()] = socket.id; // we use the uuid library to generate a unique id for the user.
        callback(true);
      }
    });
  };
}
