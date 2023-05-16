/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

// State types
export interface ISocketContext {
  socket: Socket | undefined;
  current_uid: string; // the id of the current user, e.g. '1Y2Z3X4W5V6U7T8S9R0Q'
  logged_users: string[]; // '{{"userId":1,"userName":"Alex"},{"userId":2,"userName":"Bulma"}}'
}

export interface IReducerActions {
  type: 'update_socket' | 'update_current_uid' | 'update_logged_users' | 'remove_user';
  payload: string | string[] | Socket | null; // types admited by reducer.
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
