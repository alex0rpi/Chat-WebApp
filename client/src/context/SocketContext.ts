/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

// State types
export interface ISocketContext {
  socket: Socket | undefined;
  current_uid: string; // the id of the current user, e.g. '1Y2Z3X4W5V6U7T8S9R0Q'
}

export interface IReducerActions {
  type: 'update_socket' | 'update_current_uid' | 'remove_user';
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
};

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  dispatch: () => {},
});

export const SocketContextProvider = SocketContext.Provider;
