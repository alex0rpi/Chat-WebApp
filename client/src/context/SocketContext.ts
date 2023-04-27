/* eslint-disable @typescript-eslint/no-empty-function */
// create a context for authentication
import { Dispatch, createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContext {
  socket: Socket | undefined;
  uid: string | null; // your own id
  users: string[]; // list of all the ids already connected
  messages: string[]; // list of all the messages (in a room or in the welcome chat)
  rooms: string[]; // list of all the rooms
}

interface IReducerActions {
  type: 'update_socket' | 'update_uid' | 'update_users' | 'update_messages' | 'remove_user' | 'update_rooms';
  payload: string | string[] | Socket; // only 3 things can pass to the reducer
}
export const reducerFunction = (state: ISocketContext, action: IReducerActions) => {
  if (action.type === 'update_socket') {
    return { ...state, socket: action.payload as Socket };
  }
  if (action.type === 'update_uid') {
    return { ...state, uid: action.payload as string };
  }
  if (action.type === 'update_users') {
    return { ...state, users: action.payload as string[] };
  }
  if (action.type === 'remove_user') {
    return { ...state, users: state.users.filter((uid) => uid !== action.payload) };
  }
  return state;
};

// ### NOW WE CREATE THE CONTEXT ### //
// up until now, we have only created the types and the reducer function that will be used by the context for managing the state

export interface ISocketContextProps {
  // this is the type of the value prop of the context provider
  appState: ISocketContext;
  appDispatch: React.Dispatch<IReducerActions>; // it will look for that reducer function
}

export const initialSocketContext: ISocketContext = {
  socket: undefined,
  uid: null,
  users: [],
  messages: [],
  rooms: [],
}; // this is the default state of the context
// I don't put functions on the state, I rather use a reducer to update the state.

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  appDispatch: () => {},
});
