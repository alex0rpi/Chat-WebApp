import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { ActiveUser } from './Interfaces';
import * as evListenersEmitters from './evListeners-Emitters';
import {
  messageRepository,
  roomRepository,
  userRepository,
  userRoomRepository,
} from '../infrastructure/dependecy-injection';

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
    // !Handle connection events
    // *Integrate event___________________________________________________
    socket.on('integrate', (loggedUser, callback) => {
      socket.join('welcome'); // ?join the welcome room
      // evListenersEmitters.integrate(this, socket, loggedUser, callback);
      console.log('Integrate recieved from ' + socket.id);

      // Check if this is a reconnection
      const reconnected = Object.values(this.activeUsers).includes(socket.id);
      if (reconnected) {
        console.log('This user has reconnected');
        const current_uid = this.GetUinfoKeyFromSocketId(socket.id);

        if (current_uid) {
          const logged_users = Object.values(this.activeUsers);
          // convert the obj to an array of socket ids
          console.log('Sending callback for reconnect ...');
          callback(current_uid, logged_users);
          // cb func that will be executed on client side, where it will receive the uid (user info consisting of userId and userName), and users array.
          return;
        }
      }

      // If it is a new connection, add it to the active users list
      const current_uid = JSON.stringify({
        userId: loggedUser.userId,
        userName: loggedUser.userName,
      });

      this.activeUsers[current_uid] = socket.id;
      // this.activeUsers is an obj like:
      // {
      // '{"userId":1,"userName":"Alex"}': '1Y2Z3X4W5V6U7T8S9R0Q'
      // }
      const logged_users = Object.values(this.activeUsers); // convert the obj to array of socketIds
      console.log('Sending callback for integrate ...');
      callback(current_uid, logged_users);

      // Send new user to all connected users
      this.SendMessage(
        'user_connected',
        'welcome',
        logged_users.filter((id) => id !== socket.id),
        logged_users // array of socket ids of all connected users
      );
      //this sends the message to all connected users, except the one that just connected.
    });

    // *Enter_room event___________________________________________________
    socket.on('enter_room', async (data) => {
      // evListenersEmitters.enterRoom(this, data);
      socket.join(data.roomName); // ?join the roomName specified
      const { userId, roomName } = data;
      try {
        // Retrieve user
        const user = await userRepository!.retrieveById(userId); // userId & userName

        // Get the previous room where the user was in, if any
        const previousRoom = await userRoomRepository!.findRoomByUserId(user.userId); // returns an object

        // Delete current user from any other previous rooms he/she was in.
        let previousRoomObj = null;
        if (previousRoom) {
          await userRoomRepository!.deleteUserRooms(user.userId);
          // Retrieve previous room object
          previousRoomObj = await roomRepository!.retrieveRoomById(previousRoom.roomId);
        }

        // Retrieve next room where he/she wants to enter
        const nextRoom = await roomRepository!.retrieveRoomByName(roomName);

        // Add user to the new room at the userRoom table (which is the one that contains the userId and the roomId)
        await userRoomRepository!.addUserToRoom(userId, nextRoom.roomId);

        // ! Inform users in the new room and the ones of the previous room too---------------
        if (previousRoomObj) {
          const room = await roomRepository!.retrieveRoomByName(roomName);
          // save message on db
          await messageRepository!.createMessage(
            null,
            null,
            previousRoomObj.roomName,
            `${user.userName} is gone bye bye 👋🏻👋🏻`
          );

          // Once done, get all updated messages for this room, including their respective user info.
          const messages = await messageRepository!.retrieveRoomMessages(room.roomId);
          // console.log(messages[messages.length - 1]);

          // Send updated messages to all users in the room
          //* una idea era agegir el .to() però llavors tampoc s'enviarà els newMessages a l'usuari que ha enviat el missatge.
          serverSocket.io.to(room.roomName).emit('update_messages', {
            roomName: room.roomName,
            newMessages: messages,
          });
        }

        const nextRoomData = {
          userId: null,
          userName: null,
          roomName: nextRoom.roomName, // this is the new current room being informed of the new arrival.
          message: `${user.userName} joined the room👏🏻`,
        };
        // emit here the message to the next room

        // ! Users have been informed ----------------------------------------

        //* Get the list all rooms with their users
        const rooms = await roomRepository!.getAllRoomsAndUsers();
        socket.emit('update_user_room', { user, nextRoom, rooms });
        // Emit this information to the client side so proper updates are made.
      } catch (err) {
        console.log('update_user_room fail:', err);
      }
    });

    socket.on('new_message', (data) => {
      evListenersEmitters.newMessage(this, data);
    });

    socket.on('disconnect', () => {
      evListenersEmitters.disconnect(this, socket);
    });

    socket.on('create_room', (roomName) => {
      evListenersEmitters.createRoom(this, roomName);
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
  SendMessage = (
    event: string,
    roomName: string,
    users?: string[],
    payload?: string[] | string
  ) => {
    console.log(`Server emits event: #${event}# to `, users);
    payload
      ? this.io.to(roomName).emit(event, payload)
      : this.io.to(roomName).emit(event);
  };
}
