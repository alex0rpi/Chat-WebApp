import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot `◑﹏◐´';
  public connectedUsers: {
    [uid: string]: string; // we define both the key and value as strings.
    //* IT IS AN OBJECT, NOT AN ARRAY. AN OBJECT CONTAINING:
    // {sdfdsfdsfssf: 'socketId1', 435o4i35o4i3j5: 'socketId2', ...}
    // We do this to easily query the object with a dynamic key [SocketId] and get the user
  };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this; // this is a singleton class, so we set the instance to this class.
    this.connectedUsers = {}; // initialize the users object
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

    console.info('Socket.io server started');
  }

  //  *Event listeners ________________________________________________________________________

  StartListeners = (socket: Socket) => {
    // *SOCKET IDS ARE UNIQUE TO EACH CONNECTION OR BROWSER WINDOW
    console.info('Comm. received from ' + socket.id);

    // !Handle connection event

    socket.on('connection', (callback: (uid: string, users: string[]) => void) => {
      // I provide the requester with a socket.id, so I can identify him/her later
      // check is the user is new to the world
      console.log('New user connected!!!!!');
      // !Generate new user
      const uid = v4();
      this.connectedUsers[uid] = socket.id;
      const users = Object.values(this.connectedUsers);
      // socket.broadcast.emit('message', `${this.botName}: A new user has joined the welcome chat`);
      // Transmit the updated active users list to all the clients
      console.info('Sending callback for handshake...');
      callback(uid, users);
      // !Send the new user to all other users (notify them that a new user has joined)
      this.sendMessage(
        'user_connected',
        users.filter((id) => id !== socket.id), // to avoid sending the message to the user that just connected
        users // we pass the users as the actual payload
      );
    });

    socket.on('chatMsg', (message: string) => {
      // when a user sends a message
      console.log(message);
      // socket.broadcast.emit('message', message);
    });

    // !Handle disconnect event (the user needs to give me back the socket.id I provided to him/her, so I can remove it from the users object)
    socket.on('disconnect', () => {
      console.log('Disconnect received from ' + socket.id);
      const uid = this.getUidFromSocketId(socket.id);
      console.log(uid);
      if (uid) delete this.connectedUsers[uid];
      const updatedUsers = Object.values(this.connectedUsers);
      // this.sendMessage('user_disconnected', updatedUsers, uid);
      this.io.emit('message', { updatedUsers, message: `${this.botName}: user ${uid} is gone bye bye..` });
    });
  };

  //  *Util methods ________________________________________________________________________

  getUidFromSocketId = (socketId: string) =>
    Object.keys(this.connectedUsers).find((sId) => this.connectedUsers[sId] === socketId);
  // this gives us the uid of the user that has the socket id that we passed in.

  //* @param name --> the name of the event that we want to send (ex: message, disconnect, etc.)
  //* @param users --> the list of users' ids that we want to send the message to
  //* @param name --> any additional data that we want to send with the message

  sendMessage = (name: string, users: string[], payload?: Object) => {
    console.log('Emitting event: ' + name + ' to ', users);
    users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
  };
}
