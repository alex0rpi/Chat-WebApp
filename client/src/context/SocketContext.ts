/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Room } from '../models/Interfaces';

// State types
export interface ISocketContext {
  socket: Socket | undefined;
  current_uid: string; // the id of the current user
  logged_users: string[]; // ['name1', 'name2', 'name3']
  rooms?: Room[];
}

export interface IReducerActions {
  type:
    | 'update_socket'
    | 'update_current_uid'
    | 'update_logged_users'
    | 'remove_user'
    | 'change_room';
  payload: string | string[] | Socket; // types admited by reducer.
}
export const reducerFunction = (
  state: ISocketContext,
  action: IReducerActions
): ISocketContext => {
  if (action.type === 'update_socket') {
    // payload is a socket object
    return { ...state, socket: action.payload as Socket };
  }
  if (action.type === 'update_current_uid') {
    return { ...state, current_uid: action.payload as string };
  }
  if (action.type === 'update_logged_users') {
    return { ...state, logged_users: action.payload as string[] };
  }
  if (action.type === 'remove_user') {
    return {
      ...state,
      logged_users: state.logged_users.filter(
        (socketId) => socketId !== (action.payload as string)
      ),
    };
  }
  if (action.type === 'change_room') {
    return {
      ...state,
      rooms: action.payload as unknown as Room[],
    };
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
  socket: undefined,
  current_uid: '',
  logged_users: [],
  rooms: [],
}; // this is the default state of the context

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  dispatch: () => {},
});

export const SocketContextProvider = SocketContext.Provider;
