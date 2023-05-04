/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Message, User } from '../models/Interfaces';

// State types
export interface ISocketContext {
  socket: Socket | null;
  current_uid: number | null; // the id of the current user
  logged_users: User[]; // ['name1', 'name2', 'name3']
  messages: Message[]; // list of all the messages (in a room or in the welcome chat)
}

export interface IReducerActions {
  type: 'update_socket' | 'remove_socket' | 'update_logged_users' | 'remove_user' | 'update_messages';
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
  if (action.type === 'remove_user') {
    return { ...state, logged_users: [] };
  }
  /* if (action.type === 'remove_user') {
    const updatedUsers = state.logged_users.filter((user) => user.uid !== state.current_uid);
    return { ...state, logged_users: updatedUsers };
  } */
  if (action.type === 'update_messages') {
    const updatedMessages: Message[] = [...state.messages, action.payload as Message];
    return { ...state, messages: updatedMessages };
  }
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
  current_uid: null,
  logged_users: [],
  messages: [],
}; // this is the default state of the context

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  dispatch: () => {},
});
