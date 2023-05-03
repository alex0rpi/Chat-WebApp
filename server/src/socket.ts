import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { getCurrentUser, getRoomUsers, userJoin, userLeave } from './utils/users';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public botName = 'Bot `◑﹏◐´';

  constructor(server: HTTPServer) {
    ServerSocket.instance = this; // this is a singleton class, so we set the instance to this class.
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

    socket.on('join', ({ username, room }) => {
      // when a user joins the welcome chat
      const user = userJoin(socket.id, username, room);

      socket.join(room);
      socket.emit('message', { message: `${this.botName}: Welcome to the chat ${username}!` });
      socket.broadcast.to(room).emit('message', { message: `${this.botName}: ${username} has joined the chat!` });
      // Pass on information to the client side
      this.io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    socket.on('chatMsg', (message: string) => {
      const user = getCurrentUser(socket.id);
      // We want to emit this back to the client, so everyone connected to the room can see it or scroll to it.
      this.io.to(user!.room).emit('message', { message: `${user!.username}: ${message}` });
    });

    // !Handle disconnect event (the user needs to give me back the socket.id I provided to him/her, so I can remove it from the users object)
    socket.on('disconnect', () => {
      console.log('Disconnect received from ' + socket.id);
      const user = userLeave(socket.id); // the removed user
      this.io
        .to(user!.room)
        .emit('message', { message: `${this.botName}: user ${user!.username} is gone bye bye..` });
      this.io.to(user!.room).emit('roomUsers', {
        room: user!.room,
        users: getRoomUsers(user!.room),
      });
    });
  };
}
