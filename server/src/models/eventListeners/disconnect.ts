import { Socket } from 'socket.io'
import { ServerSocket } from '../socket'
import { enterRoom } from './enterRoom'

export const disconnect = async (serverSocket:ServerSocket, socket:Socket) => {
  const uid = serverSocket.GetUinfoKeyFromSocketId(socket.id) 
  // get the whole user object from the socket id

  if (uid) {
    const user = JSON.parse(uid)
    enterRoom(serverSocket, user.userId, "welcome") // enter the user in the welcome chat room

    // Borra el usuario de la lista de users
    delete serverSocket.activeUsers[uid]
    const users = Object.values(serverSocket.activeUsers)

    serverSocket.SendMessage('user_disconnected', users, socket.id)
    // send the users array to all remaining connected users.
  }
}