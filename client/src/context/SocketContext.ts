/* eslint-disable @typescript-eslint/no-empty-function */
// create a context for authentication
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContext {
  socket: Socket | null;
  uid: string | null; // your own id
  users: string[] | string; // list of all the ids already connected
  messages: string[] | string; // list of all the messages (in a room or in the welcome chat)
  rooms: string[]; // list of all the rooms
}

interface IReducerActions {
  type:
    | 'update_socket'
    | 'update_uid'
    | 'update_users'
    | 'remove_user'
    | 'update_messages'
    | 'update_rooms'
    | 'remove_room';
  payload: string | string[] | Socket; // only 3 things can pass to the reducer
}
export const reducerFunction = (state: ISocketContext, action: IReducerActions) => {
  if (action.type === 'update_socket') {
    // payload is a socket object
    return { ...state, socket: action.payload as Socket };
  }
  if (action.type === 'update_uid') {
    // payload is a string
    return { ...state, uid: action.payload as string };
  }
  if (action.type === 'update_users') {
    // payload is either an array of users or just a single string
    const newUsers = Array.isArray(action.payload) ? action.payload : [action.payload]; // we put it in an array in case it is a single string
    return { ...state, users: [...state.users, ...newUsers] };
    // we use the spread operator to add the new users to the existing ones, if any.
  }
  // if (action.type === 'remove_user') {
  //   // payload is a string
  //   return { ...state, users: state.users.filter((uid) => uid !== action.payload) };
  // }
  if (action.type === 'update_messages') {
    // payload is an array of messages
    return { ...state, messages: action.payload as string[] };
  }
  if (action.type === 'update_rooms') {
    // payload is an array of rooms
    return { ...state, rooms: action.payload as string[] };
  }
  if (action.type === 'remove_room') {
    // payload is a string
    return { ...state, rooms: state.rooms.filter((room) => room !== action.payload) };
  }
  return state;
};

// ### CREATE THE CONTEXT ### //
// up until now, we have only created the types and the reducer function that will be used

export interface ISocketContextProps {
  // defines the shape of the context provider props. This interface has two properties:
  appState: ISocketContext;
  appDispatch: React.Dispatch<IReducerActions>; // it will look for that reducer function
}

export const initialSocketContext: ISocketContext = {
  users: [],
  socket: null,
  uid: null,
  messages: [],
  rooms: [], //
}; // this is the default state of the context

export const SocketContext = createContext<ISocketContextProps>({
  appState: initialSocketContext,
  appDispatch: () => {},
});
