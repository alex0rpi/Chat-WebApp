/* eslint-disable @typescript-eslint/no-empty-function */
// create a context for authentication
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContext {
  socket: Socket | undefined;
  uid: string | null; // your own id
  users: string[]; // list of all the ids already connected
  messages: string[]; // list of all the messages (in a room or in the welcome chat)
  rooms: string[]; // list of all the rooms
}

export const initialSocketContext: ISocketContext = {
  socket: undefined,
  uid: null,
  users: [],
  messages: [],
  rooms: [],
}; // this is the default state of the context
// I don't put functions on the state, I rather use a reducer to update the state.

export const SocketContext = createContext(initialSocketContext);
