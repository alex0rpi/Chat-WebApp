/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Message, User } from '../models/Interfaces';

// State types
export interface ISocketContext {
  socket: Socket | null;
  logged_users: User[]; // list of all the ids already connected
  messages: string[]; // list of all the messages (in a room or in the welcome chat)
  rooms: string[]; // list of all the rooms
}

export interface IReducerActions {
  type:
    | 'update_socket'
    | 'remove_socket'
    | 'update_logged_users'
    // | 'remove_user'
    | 'update_messages';
  // | 'update_rooms'
  // | 'remove_room';
  payload: number | string | string[] | User[] | Message | Socket | null; // types admited by reducer.
}
export const reducerFunction = (state: ISocketContext, action: IReducerActions): ISocketContext => {
  if (action.type === 'update_socket') {
    // payload is a socket object
    return { ...state, socket: action.payload as Socket };
  }
  if (action.type === 'remove_socket') {
    return { ...state, socket: null };
  }
  if (action.type === 'update_logged_users') {
    const updatedUsers = action.payload; // array of User objects
    console.log(updatedUsers);
    return { ...state, logged_users: updatedUsers as User[] };
  }
  if (action.type === 'update_messages') {
    const updatedMessages: string[] = [...state.messages, action.payload as string];
    return { ...state, messages: updatedMessages };
  }
  /*   if (action.type === 'update_rooms') {
    // payload is an array of rooms
    return { ...state, rooms: action.payload as string[] };
  } */
  /* if (action.type === 'remove_room') {
    // payload is a string
    return { ...state, rooms: state.rooms.filter((room) => room !== action.payload) };
  } */
  return state;
};

// ### CREATE THE CONTEXT ### //
export interface ISocketContextProps {
  // defines the shape of the context provider props. This interface has two properties:
  appState: ISocketContext;
  dispatch: React.Dispatch<IReducerActions>; // it will look for that reducer function
}

export const initialSocketContext: ISocketContext = {
  socket: null,
  logged_users: [],
  messages: [],
  rooms: [], //
}; // this is the default state of the context

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  dispatch: () => {},
});
